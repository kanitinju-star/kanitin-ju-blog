import { Search, Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { blogPosts } from "@/data/BlogPost.js";
export function BlogCard({ category, title, excerpt, date, author, image }) {
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

                    {/* Search Input */}
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

                    {/* Categories */}
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
                    {blogPosts.slice(0, 6).map((post) => (
                        <BlogCard
                            key={post.id}
                            category={post.category}
                            title={post.title}
                            excerpt={post.description}
                            date={post.date}
                            author={post.author}
                            image={post.image}
                        />
                    ))}
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