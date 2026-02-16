import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    CheckCircle,
    Clock
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AdminArticleListPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = (id) => {
        toast.success("Article deleted successfully!");
        // In real app, would call API and refresh list
    };

    // Mock Data
    const articles = [
        {
            id: 1,
            title: "Understanding Girlhood Reformation: Why we redefine...",
            category: "Highlight",
            status: "Published",
            date: "12 Sep 2024",
            image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2643&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "The Fascinating World of Cats: Why We Love Our Furry...",
            category: "Cat",
            status: "Published",
            date: "12 Sep 2024",
            image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2515&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Finding Balance: How to Use Positive Thinking...",
            category: "Inspiration",
            status: "Draft",
            date: "10 Sep 2024",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2662&auto=format&fit=crop"
        }
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-headline-3 text-brown-600">Article management</h1>
                    <Link to="/admin/articles/create">
                        <Button className="rounded-full bg-brown-600 text-white hover:bg-brown-500 gap-2 font-medium">
                            <Plus size={18} />
                            Create article
                        </Button>
                    </Link>
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-brown-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400" size={18} />
                        <Input
                            placeholder="Search article..."
                            className="pl-10 bg-brown-100/50 border-none rounded-xl text-brown-600 placeholder:text-brown-300 focus-visible:ring-1 focus-visible:ring-brown-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button variant="outline" className="gap-2 rounded-xl text-brown-600 border-brown-200 hover:bg-brown-100">
                            <Filter size={16} /> Category
                        </Button>
                        <Button variant="outline" className="gap-2 rounded-xl text-brown-600 border-brown-200 hover:bg-brown-100">
                            <Filter size={16} /> Status
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-brown-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brown-100/30 border-b border-brown-100 text-xs uppercase text-brown-400 font-medium tracking-wider">
                                <th className="p-6">Article Name</th>
                                <th className="p-6">Category</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brown-100">
                            {articles.map((article) => (
                                <tr key={article.id} className="hover:bg-brown-50/50 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 bg-brown-200 rounded-lg overflow-hidden shrink-0">
                                                <img src={article.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-medium text-brown-600 line-clamp-2 max-w-sm text-body-1">
                                                {article.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-bold",
                                            article.category === "Highlight" ? "bg-green-100 text-green-600" :
                                                article.category === "Cat" ? "bg-blue-100 text-blue-600" :
                                                    "bg-purple-100 text-purple-600"
                                        )}>
                                            {article.category}
                                        </span>
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            {article.status === "Published" ? (
                                                <CheckCircle size={16} className="text-green-500" />
                                            ) : (
                                                <Clock size={16} className="text-brown-400" />
                                            )}
                                            <span className={cn(
                                                "text-sm font-medium",
                                                article.status === "Published" ? "text-green-600" : "text-brown-500"
                                            )}>
                                                {article.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/admin/articles/edit/${article.id}`}>
                                                <Button variant="ghost" size="icon" className="hover:bg-brown-100 text-brown-400 hover:text-brown-600">
                                                    <Edit size={18} />
                                                </Button>
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="hover:bg-red-50 text-brown-400 hover:text-red-500">
                                                        <Trash2 size={18} />
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
                                                            onClick={() => handleDelete(article.id)}
                                                            className="rounded-full bg-brown-600 text-white hover:bg-brown-500 px-8 text-body-2 font-semibold"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
