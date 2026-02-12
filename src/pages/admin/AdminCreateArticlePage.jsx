import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have this or use standard textarea
import {
    ChevronLeft,
    Image as ImageIcon,
    Upload
} from "lucide-react";
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
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/articles">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                                <ChevronLeft size={24} className="text-gray-600" />
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800">Create article</h1>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="rounded-full border-gray-200 text-gray-600">
                            Save as draft
                        </Button>
                        <Button
                            onClick={handlePublish}
                            disabled={loading}
                            className="rounded-full bg-black text-white hover:bg-gray-800 min-w-[120px]"
                        >
                            {loading ? "Publishing..." : "Publish"}
                        </Button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Editor */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500 ml-1">Title</label>
                                <Input
                                    placeholder="Enter article title..."
                                    className="text-lg font-medium border-gray-200 bg-gray-50/50 rounded-xl py-6"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500 ml-1">Introduction (max 100 chars)</label>
                                <Textarea
                                    placeholder="Brief introduction..."
                                    className="min-h-[100px] border-gray-200 bg-gray-50/50 rounded-xl resize-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-500 ml-1">Content</label>
                                <Textarea
                                    placeholder="Write your article content here..."
                                    className="min-h-[400px] border-gray-200 bg-gray-50/50 rounded-xl resize-none font-mono text-sm leading-relaxed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-6">
                        {/* Thumbnail */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="font-bold text-gray-700">Thumbnail image</h3>
                            <div className="aspect-video bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 gap-2 cursor-pointer hover:bg-gray-100 transition-colors">
                                <ImageIcon size={32} />
                                <span className="text-xs font-medium">Upload thumbnail image</span>
                            </div>
                            <Button variant="outline" className="w-full rounded-xl border-gray-200 text-gray-600">
                                <Upload size={16} className="mr-2" />
                                Choose file
                            </Button>
                        </div>

                        {/* Category */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="font-bold text-gray-700">Category</h3>
                            <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 outline-none focus:ring-2 focus:ring-gray-200">
                                <option value="">Select category</option>
                                <option value="Highlight">Highlight</option>
                                <option value="Cat">Cat</option>
                                <option value="Inspiration">Inspiration</option>
                                <option value="General">General</option>
                            </select>
                        </div>

                        {/* Author */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                            <h3 className="font-bold text-gray-700">Author name</h3>
                            <Input
                                placeholder="Enter author name"
                                className="bg-gray-50 border-gray-200 rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
