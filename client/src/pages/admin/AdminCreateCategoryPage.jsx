import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export function AdminCreateCategoryPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");

    const handleSave = () => {
        if (!name.trim()) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.success("Category created successfully!");
            navigate("/admin/categories");
        }, 1000);
    };

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
                        <h1 className="text-2xl font-bold text-gray-800">Create category</h1>
                    </div>
                    <Button
                        onClick={handleSave}
                        disabled={loading || !name}
                        className="rounded-full bg-black text-white hover:bg-gray-800 min-w-[100px]"
                    >
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </div>

                {/* Form Content */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-500 ml-1">Category Name</label>
                        <Input
                            placeholder="Enter category name..."
                            className="bg-gray-50 border-gray-200 rounded-xl p-6 text-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
