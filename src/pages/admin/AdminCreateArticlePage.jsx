import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AdminCreateArticlePage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePublish = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Article published successfully!");
            navigate("/admin/articles");
        }, 1000);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-12">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-headline-3 text-brown-600">Create article</h1>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full border-brown-200 text-brown-400 bg-white hover:bg-brown-100 px-6 font-medium text-body-2">
                            Save as draft
                        </Button>
                        <Button
                            onClick={handlePublish}
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
                        <div className="w-full aspect-[2/1] md:aspect-[3/1] bg-brown-100/50 rounded-3xl flex flex-col items-center justify-center border-2 border-dashed border-brown-200 gap-4">
                            <ImageIcon className="w-12 h-12 text-brown-300" />
                            <Button variant="outline" className="rounded-full border-brown-200 text-brown-500 bg-white hover:bg-brown-100 font-medium text-body-2">
                                Upload thumbnail image
                            </Button>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Category</label>
                        <select className="w-full p-3 bg-brown-100/50 border-none rounded-xl text-brown-600 outline-none focus:ring-1 focus:ring-brown-200 text-body-1">
                            <option value="">Select category</option>
                            <option value="Highlight">Highlight</option>
                            <option value="Cat">Cat</option>
                            <option value="Inspiration">Inspiration</option>
                            <option value="General">General</option>
                        </select>
                    </div>

                    {/* Author */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Author name</label>
                        <Input
                            placeholder="Thompson P."
                            className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 placeholder:text-brown-300 text-body-1"
                        />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Title</label>
                        <Input
                            placeholder="Article title"
                            className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 placeholder:text-brown-300 text-body-1"
                        />
                    </div>

                    {/* Introduction */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Introduction (max 120 letters)</label>
                        <Textarea
                            placeholder="Introduction"
                            className="min-h-[120px] bg-brown-100/50 border-none rounded-xl p-4 shadow-none resize-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 placeholder:text-brown-300 text-body-1"
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label className="text-body-2 font-medium text-brown-400 ml-1">Content</label>
                        <Textarea
                            placeholder="Content"
                            className="min-h-[400px] bg-brown-100/50 border-none rounded-xl p-4 shadow-none resize-none focus-visible:ring-1 focus-visible:ring-brown-200 font-mono text-sm leading-relaxed text-brown-600 placeholder:text-brown-300"
                        />
                    </div>

                </div>
            </div>
        </AdminLayout>
    );
}
