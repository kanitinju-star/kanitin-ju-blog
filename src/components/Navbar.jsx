import { Bell, ChevronDown, Menu} from "lucide-react";
import { cn } from "@/lib/utils";
const Logo = ({ className }) => (
    <div className={cn("text-headline-3 font-bold tracking-tight text-brown-600", className)}>
        LOGO<span className="text-brand-green">.</span>
    </div>
);
export function NavBarMain() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-brown-100 border-b border-brown-200 lg:px-12">
            <Logo />

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
                <button className="px-8 py-2.5 text-body-1 font-semibold text-brown-600 border border-brown-300 rounded-full hover:bg-brown-200 transition-colors cursor-pointer">
                    Log in
                </button>
                <button className="px-8 py-2.5 text-body-1 font-semibold text-white bg-brown-600 rounded-full hover:bg-brown-500 transition-colors cursor-pointer">
                    Sign up
                </button>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden text-brown-400 cursor-pointer">
                <Menu size={24} />
            </div>
        </nav>
    );
}

export function NavBarMember() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-brown-100 border-b border-brown-200 lg:px-12">
            <Logo />

            <div className="flex items-center gap-4 md:gap-6">
                <div className="p-2.5 bg-white rounded-full text-brown-400 shadow-sm cursor-pointer hover:bg-brown-200 transition-colors border border-brown-200">
                    <Bell size={20} />
                </div>

                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-brown-200">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Membername"
                            alt="Profile"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="hidden sm:flex items-center gap-1 group-hover:text-brown-600 transition-colors">
                        <span className="text-body-2 font-semibold text-brown-500">Membername</span>
                        <span className="text-brown-400 group-hover:translate-y-0.5 transition-transform">
                            <ChevronDown size={16} />
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}