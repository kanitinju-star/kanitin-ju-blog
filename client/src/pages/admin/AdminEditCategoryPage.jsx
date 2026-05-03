import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function AdminEditCategoryPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("Highlight"); // Mock initial value

    const handleUpdate = () => {
        if (!name.trim()) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Category updated successfully!");
            navigate("/admin/categories");
        }, 1000);
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this category?")) {
            toast.success("Category deleted!");
            navigate("/admin/categories");
        }
    }

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/categories">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                                <ChevronLeft size={24} className="text-gray-600" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Edit category</h1>
                            <p className="text-sm text-gray-400">ID: {id}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            className="rounded-full gap-2 bg-red-100 text-red-600 hover:bg-red-200 border-none"
                        >
                            <Trash2 size={18} />
                            Delete
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={loading || !name}
                            className="rounded-full bg-black text-white hover:bg-gray-800 min-w-[100px]"
                        >
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 ml-1">Category Name</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter category name..."
                            className="bg-gray-50 border-gray-200 rounded-xl p-6 text-lg"
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
