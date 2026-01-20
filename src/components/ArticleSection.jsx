import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogCard } from "./BlogCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { formatDate } from "@/lib/dateUtils";

export function ArticleSelection() {
    const categories = ["Highlight", "Cat", "Inspiration", "General"];
    const [category, setCategory] = useState("Highlight");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    // API URL
    const API_URL = "https://blog-post-project-api.vercel.app/posts";

    const fetchPosts = async (currentPage, isNewCategory = false) => {
        setLoading(true);
        setError(null);
        try {
            let url = `${API_URL}`;
            const params = new URLSearchParams();
            if (category !== "Highlight") {
                params.append("category", category);
            }
            params.append("page", currentPage);
            params.append("limit", 6);

            const response = await axios.get(url, { params });
            const newPosts = response.data.posts;

            if (isNewCategory || currentPage === 1) {
                setPosts(newPosts);
            } else {
                setPosts(prev => [...prev, ...newPosts]);
            }

            // Check if there are more pages
            const { currentPage: apiPage, totalPages } = response.data;
            setHasMore(apiPage < totalPages);

        } catch (err) {
            console.error("Error fetching posts:", err);
            setError("Failed to load articles. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Reset and fetch when category changes
    useEffect(() => {
        setPage(1);
        setPosts([]);
        fetchPosts(1, true);
    }, [category]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
    };


    return (
        <section className="w-full px-6 pt-12 md:px-12 lg:px-24">
            <div className="bg-white rounded-3xl border border-brown-200 p-8 md:p-12 shadow-sm space-y-8">
                <h2 className="text-headline-2 font-bold text-brown-600">Latest articles</h2>

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

                    <div className="w-full md:w-auto order-2 md:order-1">
                        <div className="hidden md:flex items-center gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    disabled={category === cat}
                                    className={cn(
                                        "px-6 py-2.5 rounded-xl text-body-2 font-semibold transition-all cursor-pointer",
                                        category === cat
                                            ? "bg-black text-white cursor-default"
                                            : "text-brown-400 hover:text-brown-600 hover:bg-brown-200"
                                    )}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="md:hidden w-full">
                            <label className="text-body-3 font-semibold text-brown-400 ml-2 mb-2 block">Category</label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className="w-full bg-white border-brown-200 rounded-xl px-4 py-6 text-brown-600 text-body-2 font-semibold">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat} value={cat} className="text-body-2 font-medium text-brown-600">
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                    {/* Handle initial loading state differently if desired, currently loading state covers all */}
                    {posts.length === 0 && loading ? (
                        <div className="col-span-full text-center py-12 text-brown-400">Loading articles...</div>
                    ) : error ? (
                        <div className="col-span-full text-center py-12 text-red-500">{error}</div>
                    ) : (
                        <>
                            {posts.map((post) => (
                                <BlogCard
                                    key={post.id}
                                    category={post.category}
                                    title={post.title}
                                    excerpt={post.description}
                                    date={formatDate(post.date)}
                                    author={post.author}
                                    image={post.image}
                                />
                            ))}
                        </>
                    )}
                </div>

                {/* View More Button */}
                {hasMore && (
                    <div className="flex justify-center pt-8">
                        <div className="text-center mt-8">
                            <button
                                onClick={handleLoadMore}
                                className="text-body-1 font-semibold text-brown-600 hover:text-brand-green transition-colors underline decoration-2 underline-offset-8 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "View more"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
