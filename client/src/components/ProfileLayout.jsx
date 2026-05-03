import { Link, useLocation } from "react-router-dom";
import { User, Lock, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavBarMain } from "./Navbar";

export function ProfileLayout({ children }) {
    const location = useLocation();

    const menuItems = [
        { href: "/profile", label: "Profile", icon: User },
        { href: "/reset-password", label: "Reset password", icon: Lock },
        { href: "/notifications", label: "Notification", icon: Bell },
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <NavBarMain />

            <main className="flex-grow bg-[#Fdfdfd]">
                <div className="max-w-6xl mx-auto py-12 px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full md:w-64 space-y-2">
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-body-2",
                                            isActive
                                                ? "bg-white shadow-sm border border-brown-100 text-brown-600 font-bold"
                                                : "text-brown-400 hover:bg-brown-50"
                                        )}
                                    >
                                        <item.icon size={18} className={isActive ? "text-black" : "text-brown-400"} />
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </aside>

                        {/* Content */}
                        <div className="flex-1 bg-white rounded-3xl p-8 border border-brown-100 shadow-sm min-h-[500px]">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
