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
        title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
        introduction: "Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string...",
        content: `1. Independent Yet Affectionate\n\nOne of the most remarkable traits of cats is their balance between independence and affection...`,
        category: "Cat",
        author: "Thompson P.",
        thumbnail: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop"
    });

    const handleUpdate = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Article updated successfully!");
            navigate("/admin/articles");
        }, 1000);
    };

    const handleDelete = () => {
        // Implement delete logic here
        toast.success("Article deleted!");
        navigate("/admin/articles");
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
                            <img src={formData.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
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
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 bg-brown-100/50 border-none rounded-xl text-brown-600 outline-none focus:ring-1 focus:ring-brown-200 text-body-1"
                        >
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
                            value={formData.introduction}
                            onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
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
