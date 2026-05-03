import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    ChevronLeft,
    Image as ImageIcon,
    Upload,
    Trash2
} from "lucide-react";
import { toast } from "sonner";
import client from "@/lib/axios";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AdminEditArticlePage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category_id: "",
        author: "",
        image: ""
    });

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const response = await client.get(`/posts/${id}`);
                const post = response.data;
                setFormData({
                    title: post.title,
                    description: post.description,
                    content: post.content,
                    category_id: post.category_id,
                    author: post.author || "",
                    image: post.image
                });
            } catch (error) {
                console.error("Error fetching article:", error);
                toast.error("Failed to load article");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await client.put(`/posts/${id}`, {
                ...formData,
                status_id: 2 // Assuming Published for update
            });
            toast.success("Article updated successfully!");
            navigate("/admin/articles");
        } catch (error) {
            console.error("Error updating article:", error);
            toast.error(error.response?.data?.message || "Failed to update article");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await client.delete(`/posts/${id}`);
            toast.success("Article deleted!");
            navigate("/admin/articles");
        } catch (error) {
            console.error("Error deleting article:", error);
            toast.error("Failed to delete article");
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/articles">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-brown-100">
                                <ChevronLeft size={24} className="text-brown-600" />
                            </Button>
                        </Link>
                        <h1 className="text-headline-3 text-brown-600">Edit article</h1>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="rounded-full border-brown-200 text-brown-400 bg-white hover:bg-brown-100 px-6 font-medium text-body-2"
                        >
                            Save as draft
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="rounded-full bg-brown-600 text-white hover:bg-brown-500 px-6 font-medium text-body-2"
                        >
                            {loading ? "Updating..." : "Save and publish"}
                        </Button>
                    </div>
                </div>

                {/* Form Content - Single Column */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brown-100 space-y-8">

                    {/* Thumbnail */}
                    <div className="space-y-3">
                        <label className="text-body-2 font-medium text-brown-400">Thumbnail image</label>
                        <div className="w-full aspect-[2/1] md:aspect-[3/1] bg-brown-100/50 rounded-3xl overflow-hidden relative group">
                            <img src={formData.image} alt="Thumbnail" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="secondary" className="rounded-full text-body-2 font-medium">
                                    Change image
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Category</label>
                        <select
                            value={formData.category_id}
                            onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
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
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 text-body-1"
                        />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Title</label>
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 text-body-1"
                        />
                    </div>

                    {/* Introduction */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Introduction (max 120 letters)</label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="min-h-[120px] bg-brown-100/50 border-none rounded-xl p-4 shadow-none resize-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 text-body-1"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Content</label>
                        <Textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="min-h-[400px] bg-brown-100/50 border-none rounded-xl p-4 shadow-none resize-none focus-visible:ring-1 focus-visible:ring-brown-200 font-mono text-sm leading-relaxed text-brown-600"
                        />
                    </div>

                    {/* Delete Section */}
                    <div className="pt-8 border-t border-brown-100">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 gap-2 pl-0 font-medium text-body-2">
                                    <Trash2 size={18} /> Delete article
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white rounded-3xl p-8 max-w-sm border-brown-100">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-center text-headline-3 text-brown-600">Delete article</AlertDialogTitle>
                                    <AlertDialogDescription className="text-center text-body-1 text-brown-400 py-2">
                                        Do you want to delete this article?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                                    <AlertDialogCancel className="rounded-full border-brown-200 px-8 hover:bg-brown-100 text-brown-600 text-body-2 font-semibold">Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDelete}
                                        className="rounded-full bg-brown-600 text-white hover:bg-brown-500 px-8 text-body-2 font-semibold"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
