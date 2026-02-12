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
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function AdminArticleListPage() {
    const [searchQuery, setSearchQuery] = useState("");

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
                    <h1 className="text-2xl font-bold text-gray-800">Article management</h1>
                    <Link to="/admin/articles/create">
                        <Button className="rounded-full bg-black text-white hover:bg-gray-800 gap-2">
                            <Plus size={18} />
                            Create article
                        </Button>
                    </Link>
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search article..."
                            className="pl-10 bg-gray-50 border-gray-200 rounded-xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button variant="outline" className="gap-2 rounded-xl text-gray-600 border-gray-200">
                            <Filter size={16} /> Category
                        </Button>
                        <Button variant="outline" className="gap-2 rounded-xl text-gray-600 border-gray-200">
                            <Filter size={16} /> Status
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-400 font-medium tracking-wider">
                                <th className="p-6">Article Name</th>
                                <th className="p-6">Category</th>
                                <th className="p-6">Status</th>
                                <th className="p-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {articles.map((article) => (
                                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                                <img src={article.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-medium text-gray-700 line-clamp-2 max-w-sm">
                                                {article.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-bold",
                                            article.category === "Highlight" ? "bg-orange-100 text-orange-600" :
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
                                                <Clock size={16} className="text-gray-400" />
                                            )}
                                            <span className={cn(
                                                "text-sm font-medium",
                                                article.status === "Published" ? "text-green-600" : "text-gray-500"
                                            )}>
                                                {article.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="hover:bg-gray-100 text-gray-400 hover:text-gray-600">
                                                <Edit size={18} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="hover:bg-red-50 text-gray-400 hover:text-red-500">
                                                <Trash2 size={18} />
                                            </Button>
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
