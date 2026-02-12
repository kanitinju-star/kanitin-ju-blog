import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    List,
    User,
    Bell,
    Lock,
    LogOut,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function AdminLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    const sidebarItems = [
        { icon: FileText, label: "Article management", href: "/admin/articles" },
        { icon: List, label: "Category management", href: "/admin/categories" },
        { icon: User, label: "Profile", href: "/admin/profile" },
        { icon: Bell, label: "Notification", href: "/admin/notifications" },
        { icon: Lock, label: "Reset password", href: "/admin/reset-password" },
    ];

    const handleLogout = () => {
        // Mock logout
        toast.info("Logged out from Admin");
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
                <div className="p-6">
                    <Link to="/admin/articles" className="text-2xl font-bold text-brown-600 tracking-tight block mb-1">
                        hh.
                    </Link>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Admin panel</p>
                </div>

                <nav className="flex-1 px-3 space-y-1 mt-4">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all",
                                    isActive
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100 space-y-1">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all"
                    >
                        <Globe size={18} />
                        Go to website
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                    >
                        <LogOut size={18} />
                        Log out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
