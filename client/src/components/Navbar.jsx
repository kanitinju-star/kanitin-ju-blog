import { Link, useLocation } from "react-router-dom";
import client from "@/lib/axios";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Bell, Menu, X, User, LayoutDashboard, FileText, List, Lock, LogOut, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function NavBarMain({ className }) {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);



    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await client.get("/auth/get-user");
                    setUser(response.data.user);
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                    localStorage.removeItem("token");
                    localStorage.removeItem("authToken");
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        checkAuth();

        const handleStorageChange = () => {
            checkAuth();
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);



    // ... (rest of the component)
    // I need to fetch the user. I'll split this into two steps:
    // 1. Add import.
    // 2. Update logic.


    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const notifications = [
        {
            id: 1,
            user: "Thompson P.",
            action: "published a new article",
            time: "2 hours ago",
            avatar: "TP",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thompson"
        },
        {
            id: 2,
            user: "Jacob Lash",
            action: "comment on the article you have commented on",
            time: "4 hours ago",
            avatar: "JL",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob"
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
        window.dispatchEvent(new Event("storage"));
        // Optional: navigate to home if not already there, but state change will update UI
    };

    return (
        <nav className={cn("w-full bg-white border-b border-brown-100", className)}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-brown-600 tracking-tight">
                    hh.
                </Link>

                {/* Desktop Nav */}


                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    {user || localStorage.getItem("token") ? (
                        <>
                            {/* Notification Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-brown-50 text-brown-400">
                                        <Bell size={20} />
                                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80 p-0 rounded-2xl shadow-xl mt-2">
                                    <div className="p-4 flex flex-col gap-4">
                                        {notifications.map((item) => (
                                            <div key={item.id} className="flex gap-3 items-start p-2 hover:bg-brown-50/50 rounded-xl cursor-pointer transition-colors">
                                                <Avatar className="w-10 h-10 border border-white shadow-sm">
                                                    <AvatarImage src={item.image} />
                                                    <AvatarFallback>{item.avatar}</AvatarFallback>
                                                </Avatar>
                                                <div className="space-y-1">
                                                    <p className="text-body-2 text-brown-600 leading-snug">
                                                        <span className="font-bold">{item.user}</span> {item.action}
                                                    </p>
                                                    <p className="text-xs text-brown-400">{item.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="h-6 w-px bg-brown-200 mx-2" />

                            {/* User Profile Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-brown-50 pr-3 transition-colors">
                                        <Avatar className="w-9 h-9 border border-brown-200">
                                            <AvatarImage src={user?.profile_picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'User'}`} />
                                            <AvatarFallback>{user?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-body-2 font-bold text-brown-600 hidden lg:block">{user?.name || user?.username || "User"}</span>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 p-1 rounded-xl shadow-lg mt-2">
                                    <DropdownMenuItem className="p-3 cursor-pointer rounded-lg hover:bg-brown-50 focus:bg-brown-50">
                                        <Link to="/profile" className="w-full flex items-center gap-2">
                                            <User size={16} /> Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="p-3 cursor-pointer rounded-lg hover:bg-brown-50 focus:bg-brown-50 text-red-500 hover:text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600"
                                    >
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="outline" className="rounded-full px-6 border-brown-200 text-brown-600 hover:bg-brown-50">
                                    Log in
                                </Button>
                            </Link>
                            <Link to="/register">
                                <Button className="rounded-full px-6 bg-black text-white hover:bg-gray-800 shadow-md hover:shadow-lg transition-all">
                                    Sign up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 text-brown-600 hover:bg-brown-50 rounded-full"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </nav>
    );
}
