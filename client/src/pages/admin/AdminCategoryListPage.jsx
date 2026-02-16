import { useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    CheckCircle,
    Clock
} from "lucide-react";
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

export function AdminCategoryListPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleDelete = (id) => {
        toast.success("Category deleted successfully!");
    };

    // Mock Data based on design
    const categories = [
        { id: 1, name: "Highlight", status: "Published", date: "12 Sep 2024" },
        { id: 2, name: "Cat", status: "Published", date: "12 Sep 2024" },
        { id: 3, name: "Inspiration", status: "Draft", date: "12 Sep 2024" },
        { id: 4, name: "General", status: "Published", date: "12 Sep 2024" },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-headline-3 text-brown-600">Category management</h1>
                    <Link to="/admin/categories/create">
                        <Button className="rounded-full bg-brown-600 text-white hover:bg-brown-500 gap-2 font-medium">
                            <Plus size={18} />
                            Create category
                        </Button>
                    </Link>
                </div>

                {/* Toolbar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-brown-100 flex items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400" size={18} />
                        <Input
                            placeholder="Search category..."
                            className="pl-10 bg-brown-100/50 border-none rounded-xl text-brown-600 placeholder:text-brown-300 focus-visible:ring-1 focus-visible:ring-brown-200"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-brown-100 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brown-100/30 border-b border-brown-100 text-xs uppercase text-brown-400 font-medium tracking-wider">
                                <th className="p-6">Category</th>
                                <th className="p-6">Status</th>
                                <th className="p-6">Date</th>
                                <th className="p-6 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brown-100">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-brown-50/50 transition-colors group">
                                    <td className="p-6 font-medium text-brown-600 text-body-1">
                                        {category.name}
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2">
                                            {category.status === "Published" ? (
                                                <CheckCircle size={16} className="text-green-500" />
                                            ) : (
                                                <Clock size={16} className="text-brown-400" />
                                            )}
                                            <span className={cn(
                                                "text-sm font-medium",
                                                category.status === "Published" ? "text-green-600" : "text-brown-500"
                                            )}>
                                                {category.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-brown-500 text-sm">
                                        {category.date}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/admin/categories/edit/${category.id}`}>
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
                                                        <AlertDialogTitle className="text-center text-headline-3 text-brown-600">Delete category</AlertDialogTitle>
                                                        <AlertDialogDescription className="text-center text-body-1 text-brown-400 py-2">
                                                            Do you want to delete this category?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                                                        <AlertDialogCancel className="rounded-full border-brown-200 px-8 hover:bg-brown-100 text-brown-600 text-body-2 font-semibold">Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDelete(category.id)}
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
