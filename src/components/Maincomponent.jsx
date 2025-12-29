import React from "react";
import { Bell, ChevronDown, Menu, Linkedin, Github, Mail, Search, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const Logo = ({ className }) => (
    <div className={cn("text-headline-3 font-bold tracking-tight text-brown-600", className)}>
        LOGO<span className="text-brand-green">.</span>
    </div>
);

// --- Navbar Components ---

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

// --- Hero Section Component ---

export function HeroSection() {
    return (
        <section className="w-full px-6 py-12 md:px-12 lg:px-24 bg-brown-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-center lg:text-left">
                {/* Left Column: Heading & Text */}
                <div className="lg:col-span-4 space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-headline-1 font-bold text-brown-600 leading-tight">
                        Stay<br />
                        Informed,<br />
                        Stay Inspired
                    </h1>
                    <p className="text-body-1 text-brown-400 max-w-sm mx-auto lg:mx-0">
                        Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.
                    </p>
                </div>

                {/* Center Column: Image Placeholder */}
                <div className="lg:col-span-4 relative aspect-3/4 max-w-sm mx-auto w-full group">
                    <div className="absolute inset-0 bg-brown-300 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 group-hover:scale-[1.02] border border-brown-200">
                        <img
                            src=""
                            alt="Hero Placeholder"
                            className="w-full h-full object-cover"
                        />
                        {/* Fallback pattern if src is empty */}
                        <div className="w-full h-full bg-brown-200 flex items-center justify-center text-brown-400 font-bold italic">
                            Hero Image
                        </div>
                    </div>
                </div>

                {/* Right Column: Author Info Placeholder */}
                <div className="lg:col-span-4 space-y-8 lg:pl-8">
                    <div className="space-y-4">
                        <span className="text-body-3 font-semibold uppercase tracking-widest text-brown-400">-Author</span>
                        <h3 className="text-headline-3 font-bold text-brown-600">Name</h3>
                        <div className="space-y-4 text-body-2 text-brown-400">
                            <p>Author description.</p>
                            <p>etc.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// --- Article Selection & Grid Components ---

export function ArticleCard({ category, title, excerpt, date, author, image }) {
    return (
        <div className="flex flex-col gap-4 group cursor-pointer">
            <div className="aspect-[16/10] bg-brown-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 border border-brown-200">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-brown-400 font-bold italic">
                        Article Image
                    </div>
                )}
            </div>
            <div className="space-y-3 px-1">
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-brand-green-soft text-brand-green text-[10px] uppercase font-bold tracking-wider rounded-lg">
                        {category}
                    </span>
                    <span className="text-body-3 text-brown-400 flex items-center gap-1 font-medium">
                        <Clock size={12} /> {date}
                    </span>
                </div>
                <h3 className="text-headline-4 font-bold text-brown-600 line-clamp-2 leading-snug group-hover:text-brand-green transition-colors">
                    {title}
                </h3>
                <p className="text-body-2 text-brown-400 line-clamp-3 leading-relaxed">
                    {excerpt}
                </p>
                <div className="pt-2 flex items-center gap-2 text-body-3 font-semibold text-brown-500 border-t border-brown-200/50">
                    <div className="w-6 h-6 rounded-full bg-brown-300 overflow-hidden ring-1 ring-brown-200/50">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} alt={author} />
                    </div>
                    {author}
                </div>
            </div>
        </div>
    );
}

export function ArticleSelection() {
    const categories = ["Highlight", "Category", "Inspiration", "General"];

    return (
        <section className="w-full px-6 pt-12 md:px-12 lg:px-24">
            <div className="bg-white rounded-3xl border border-brown-200 p-8 md:p-12 shadow-sm space-y-8">
                <h2 className="text-headline-2 font-bold text-brown-600">Latest articles</h2>

                {/* Filters Container */}
                <div className="bg-brown-100/50 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center justify-between">

                    {/* Search Input - Desktop: right, Mobile: first */}
                    <div className="relative w-full md:w-80 group order-1 md:order-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-white border border-brown-200 rounded-xl px-6 py-3 pl-6 pr-12 text-body-2 focus:outline-none focus:ring-2 focus:ring-brown-300 transition-all font-sans"
                        />
                        <Search
                            size={20}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-brown-400 group-focus-within:text-brown-600 transition-colors"
                        />
                    </div>

                    {/* Categories - Desktop: left, Mobile: second */}
                    <div className="w-full md:w-auto order-2 md:order-1">
                        {/* Desktop: Buttons */}
                        <div className="hidden md:flex items-center gap-2">
                            {categories.map((cat, idx) => (
                                <button
                                    key={cat}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-body-2 font-semibold transition-all cursor-pointer",
                                        idx === 0
                                            ? "bg-brown-300 text-brown-600 shadow-sm"
                                            : "text-brown-400 hover:text-brown-600 hover:bg-brown-200"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Mobile: Select simulated */}
                        <div className="md:hidden space-y-2">
                            <label className="text-body-3 font-semibold text-brown-400 ml-2">Category</label>
                            <div className="w-full bg-white border border-brown-200 rounded-xl px-4 py-3 flex items-center justify-between text-brown-600">
                                <span className="text-body-2 font-semibold">{categories[0]}</span>
                                <ChevronDown size={20} className="text-brown-400" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    <ArticleCard
                        category="Category"
                        title="Title"
                        excerpt="Text"
                        date="Oct 24, 2xxx"
                        author="Author"
                        image=""
                    />
                    <ArticleCard
                        category="Inspiration"
                        title="Title"
                        excerpt="Text"
                        date="Oct 20, 2xxx"
                        author="Author"
                        image=""
                    />
                    <ArticleCard
                        category="General"
                        title="Title"
                        excerpt="Text"
                        date="Oct 19, 2xxx"
                        author="Author"
                        image=""
                    />
                    <ArticleCard
                        category="General"
                        title="Title"
                        excerpt="Text"
                        date="Oct 17, 2xxx"
                        author="Author"
                        image=""
                    />
                    <ArticleCard
                        category="General"
                        title="Title"
                        excerpt="Text"
                        date="Oct 14, 2xxx"
                        author="Author"
                        image=""
                    />
                    <ArticleCard
                        category="General"
                        title="Title"
                        excerpt="Text"
                        date="Oct 10, 2xxx"
                        author="Author"
                        image=""
                    />
                </div>

                {/* View More Link */}
                <div className="flex justify-center pt-8">
                    <a
                        href="#"
                        className="text-body-1 font-semibold text-brown-600 hover:text-brand-green transition-colors underline decoration-2 underline-offset-8"
                    >
                        View more
                    </a>
                </div>
            </div>
        </section>
    );
}

// --- Footer Component ---

export function Footer() {
    return (
        <footer className="w-full bg-brown-100 border-t border-brown-200 px-6 py-12 md:px-12 lg:px-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <span className="text-body-1 font-medium text-brown-500">Get in touch</span>
                    <div className="flex items-center gap-3">
                        <a href="#" className="p-2 bg-brown-600 text-white rounded-full hover:bg-brown-500 transition-colors cursor-pointer">
                            <Linkedin size={18} fill="currentColor" />
                        </a>
                        <a href="#" className="p-2 bg-brown-600 text-white rounded-full hover:bg-brown-500 transition-colors cursor-pointer">
                            <Github size={18} fill="currentColor" />
                        </a>
                        <a href="#" className="p-2 bg-brown-600 text-white rounded-full hover:bg-brown-500 transition-colors cursor-pointer">
                            <Mail size={18} />
                        </a>
                    </div>
                </div>
                <div className="flex items-center">
                    <a href="#" className="text-body-1 font-semibold text-brown-600 hover:underline decoration-2 underline-offset-4">
                        Home page
                    </a>
                </div>
            </div>
        </footer>
    );
}

// --- Main Layout ---

const MainNavbarPlaceholder = () => {
    return (
        <div className="flex flex-col bg-white min-h-screen">
            <div className="space-y-8 bg-white p-8 border-b border-brown-200">
                <div className="space-y-4">
                    <div className="space-y-6">
                        <NavBarMain />
                    </div>
                </div>
            </div>

            <main className="flex-grow">
                <HeroSection />
                <ArticleSelection />
                <div className="h-20" />
            </main>

            <Footer />
        </div>
    )
}

export default MainNavbarPlaceholder;