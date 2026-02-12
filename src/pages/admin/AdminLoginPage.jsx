import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AdminLoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            if (formData.password === "admin") { // Mock password
                toast.success("Welcome back, Admin!");
                navigate("/admin/articles");
            } else {
                toast.error("Invalid credentials");
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#E5E5E5] flex flex-col font-sans">
            {/* Header - Styled like AuthLayout but for Admin */}
            <header className="w-full bg-[#333] py-4 px-6 md:px-12 flex items-center justify-between border-b border-gray-600">
                <Link to="/" className="text-2xl font-bold text-white tracking-tight">
                    hh. <span className="text-xs font-normal opacity-70 ml-2 bg-white/10 px-2 py-0.5 rounded">Admin</span>
                </Link>
                <Link to="/">
                    <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10 rounded-full">
                        Back to site
                    </Button>
                </Link>
            </header>

            <main className="grow flex items-center justify-center p-6 bg-[#E5E5E5]">
                <div className="w-full max-w-md bg-[#F3F3F1] rounded-3xl p-8 md:p-12 shadow-sm">
                    <div className="text-center mb-8">
                        <p className="text-xs font-bold text-brand-orange uppercase tracking-wider mb-2">Admin Panel</p>
                        <h2 className="text-3xl font-bold text-gray-800">Log in</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-500 ml-1">Email</label>
                            <Input
                                placeholder="name@example.com"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="bg-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-500 ml-1">Password</label>
                            <Input
                                placeholder="••••••••"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="bg-white"
                            />
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-full py-6 bg-black text-white hover:bg-gray-800 text-base font-medium"
                            >
                                {loading ? "Logging in..." : "Log in"}
                            </Button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
