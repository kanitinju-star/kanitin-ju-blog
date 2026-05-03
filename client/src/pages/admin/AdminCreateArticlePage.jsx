import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import client from "@/lib/axios";

export function AdminCreateArticlePage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        category_id: "",
        description: "",
        content: "",
        author: "" // Note: Backend doesn't seem to use this yet in INSERT, but useful for UI
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Please upload a valid image file (JPEG, PNG, GIF, WebP).");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File is too large. Max 5MB.");
            return;
        }

        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (statusId) => {
        if (!formData.title || !formData.content || !formData.category_id) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!imageFile) {
            toast.error("Please select a thumbnail image.");
            return;
        }

        setLoading(true);
        const data = new FormData();
        data.append("title", formData.title);
        data.append("category_id", formData.category_id);
        data.append("description", formData.description);
        data.append("content", formData.content);
        data.append("status_id", statusId);
        data.append("author", formData.author);
        data.append("imageFile", imageFile);

        try {
            await client.post("/posts", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            toast.success(statusId === 2 ? "Article published!" : "Draft saved!");
            navigate("/admin/articles");
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error(error.response?.data?.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-headline-3 text-brown-600">Create article</h1>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => handleSubmit(1)}
                            disabled={loading}
                            className="rounded-full border-brown-200 text-brown-400 bg-white hover:bg-brown-100 px-6 font-medium text-body-2"
                        >
                            Save as draft
                        </Button>
                        <Button
                            onClick={() => handleSubmit(2)}
                            disabled={loading}
                            className="rounded-full bg-brown-600 text-white hover:bg-brown-500 px-6 font-medium text-body-2"
                        >
                            {loading ? "Publishing..." : "Save and publish"}
                        </Button>
                    </div>
                </div>

                {/* Form Content - Single Column */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brown-100 space-y-8">

                    {/* Thumbnail */}
                    <div className="space-y-3">
                        <label className="text-body-2 font-medium text-brown-400">Thumbnail image</label>
                        <div className="w-full aspect-[2/1] md:aspect-[3/1] bg-brown-100/50 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-brown-200 gap-4 overflow-hidden relative">
                            {previewUrl ? (
                                <img src={previewUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
                            ) : (
                                <ImageIcon className="w-12 h-12 text-brown-300" />
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/*"
                            />
                            {!previewUrl && (
                                <Button
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="rounded-full border-brown-200 text-brown-500 bg-white hover:bg-brown-100 font-medium text-body-2"
                                >
                                    Upload thumbnail image
                                </Button>
                            )}
                            {previewUrl && (
                                <Button
                                    variant="secondary"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-4 right-4 rounded-full shadow-md"
                                >
                                    Change Image
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Category</label>
                        <select
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-brown-100/50 border-none rounded-xl text-brown-600 outline-none focus:ring-1 focus:ring-brown-200 text-body-1"
                        >
                            <option value="">Select category</option>
                            <option value="1">Highlight</option>
                            <option value="2">Cat</option>
                            <option value="3">Inspiration</option>
                            <option value="4">General</option>
                        </select>
                    </div>

                    {/* Author */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Author name</label>
                        <Input
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            placeholder="Thompson P."
                            className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 placeholder:text-brown-300 text-body-1"
                        />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Title</label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Article title"
                            className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 placeholder:text-brown-300 text-body-1"
                        />
                    </div>

                    {/* Introduction */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Introduction (max 120 letters)</label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Introduction"
                            className="min-h-[120px] bg-brown-100/50 border-none rounded-xl p-4 shadow-none resize-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 placeholder:text-brown-300 text-body-1"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Content</label>
                        <Textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            placeholder="Content"
                            className="min-h-[400px] bg-brown-100/50 border-none rounded-xl p-4 shadow-none resize-none focus-visible:ring-1 focus-visible:ring-brown-200 font-mono text-sm leading-relaxed text-brown-600 placeholder:text-brown-300"
                        />
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
