import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function AuthLayout({ children, title }) {
    return (
        <div className="min-h-screen bg-[#E5E5E5] flex flex-col font-sans">
            {/* Header */}
            <header className="w-full bg-white py-4 px-6 md:px-12 flex items-center justify-between border-b border-gray-100">
                <Link to="/" className="text-2xl font-bold text-gray-800 tracking-tight">
                    hh.
                </Link>
                <div className="flex items-center gap-4">
                    <Link to="/login">
                        <Button variant="outline" className="rounded-full px-6 border-gray-300">
                            Log in
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button className="rounded-full px-6 bg-black text-white hover:bg-gray-800">
                            Sign up
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-lg bg-[#F3F3F1] rounded-3xl p-8 md:p-12 shadow-sm">
                    {children}
                </div>
            </main>
        </div>
    );
}
