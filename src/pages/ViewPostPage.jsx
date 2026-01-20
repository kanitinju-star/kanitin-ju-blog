import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { formatDate } from "@/lib/dateUtils";
import { Copy, Facebook, Linkedin, Twitter, MessageCircle, Heart } from "lucide-react";
import { toast } from "sonner";
import { LoginAlertDialog } from "@/components/LoginAlertDialog";

export function ViewPostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoginDialog, setShowLoginDialog] = useState(false);

    // API URL
    const API_URL = `https://blog-post-project-api.vercel.app/posts/${postId}`;

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(API_URL);
                setPost(response.data);
            } catch (err) {
                console.error("Error fetching post:", err);
                setError("Failed to load article.");
            } finally {
                setLoading(false);
            }
        };

        if (postId) {
            fetchPost();
        }
    }, [postId]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("Copied!", {
            description: "This article has been copied to your clipboard."
        });
    };

    const handleRestrictedAction = () => {
        setShowLoginDialog(true);
    };

    const shareUrl = window.location.href;
    const facebookShare = `https://www.facebook.com/share.php?u=${encodeURIComponent(shareUrl)}`;
    const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    const twitterShare = `https://www.twitter.com/share?url=${encodeURIComponent(shareUrl)}`;

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-brown-400 font-medium">
                Loading article...
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] text-red-500 font-medium">
                {error || "Article not found"}
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-fade-in-up">
            <LoginAlertDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />

            {/* Header Image */}
            <div className="aspect-video w-full rounded-3xl overflow-hidden mb-8 md:mb-12 shadow-sm border border-brown-200">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-16">
                {/* Main Content */}
                <div className="md:w-3/4 space-y-8">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-brand-green-soft text-brand-green text-[10px] uppercase font-bold tracking-wider rounded-lg">
                            {post.category}
                        </span>
                        <span className="text-body-3 text-brown-400 font-medium">
                            {formatDate(post.date)}
                        </span>
                    </div>

                    <h1 className="text-display font-bold text-brown-600 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    <div className="prose prose-lg prose-brown max-w-none text-brown-500 font-sans mb-12">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-b border-brown-200">
                        <div className="flex gap-4">
                            <button
                                onClick={handleRestrictedAction}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-brown-200 rounded-full text-body-2 font-medium text-brown-600 hover:bg-brown-50 transition-colors shadow-sm"
                            >
                                <Heart size={18} /> {post.likes}
                            </button>
                            <button onClick={handleCopyLink} className="flex items-center gap-2 px-4 py-2 bg-white border border-brown-200 rounded-full text-body-2 font-medium text-brown-600 hover:bg-brown-50 transition-colors shadow-sm">
                                <Copy size={18} /> Copy link
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <a href={facebookShare} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-600/10 text-blue-600 rounded-full hover:bg-blue-600/20 transition-colors"><Facebook size={20} /></a>
                            <a href={linkedinShare} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-700/10 text-blue-700 rounded-full hover:bg-blue-700/20 transition-colors"><Linkedin size={20} /></a>
                            <a href={twitterShare} target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-500/10 text-sky-500 rounded-full hover:bg-sky-500/20 transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Comment Section (Static Mockup) */}
                    <div className="space-y-6 pt-6">
                        <h3 className="text-headline-4 font-bold text-brown-600">Comment</h3>
                        <div className="space-y-4">
                            <textarea
                                placeholder="What are your thoughts?"
                                onFocus={handleRestrictedAction}
                                className="w-full h-32 p-4 bg-white border border-brown-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                            ></textarea>
                            <div className="flex justify-end">
                                <button onClick={handleRestrictedAction} className="px-6 py-2 bg-black text-white rounded-xl font-bold text-body-2 hover:bg-gray-800 transition-colors">
                                    Send
                                </button>
                            </div>
                        </div>

                        {/* Mock Comments */}
                        <div className="space-y-6 pt-6">
                            <div className="flex gap-4 p-4 border-b border-brown-100/50">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob" alt="Jacob" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-brown-600">Jacob Lash</span>
                                        <span className="text-xs text-brown-400">12 September 2024 at 16:30</span>
                                    </div>
                                    <p className="text-body-2 text-brown-500">I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 border-b border-brown-100/50">
                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mimi" alt="Mimi" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-brown-600">Mimi mama</span>
                                        <span className="text-xs text-brown-400">12 September 2024 at 18:30</span>
                                    </div>
                                    <p className="text-body-2 text-brown-500">This article perfectly captures why cats make such amazing pets. I had no idea their purring could help with healing. Fascinating stuff!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar (Author) - Swapped to right */}
                <aside className="md:w-1/4 shrink-0 space-y-8 md:sticky md:top-24 md:h-fit">
                    <div className="bg-brown-100/30 p-6 rounded-2xl border border-brown-200 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-brown-200 overflow-hidden ring-2 ring-white shadow-sm">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt={post.author} />
                            </div>
                            <div>
                                <p className="text-body-3 text-brown-400 font-medium">Author</p>
                                <p className="text-body-1 font-bold text-brown-600">{post.author}</p>
                            </div>
                        </div>
                        <p className="text-body-3 text-brown-500 leading-relaxed">
                            I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
                        </p>
                    </div>
                </aside>
            </div>
        </article>
    );
}
