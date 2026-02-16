import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function BlogCard({ id, category, title, excerpt, date, author, image }) {
    return (
        <Link to={`/post/${id}`} className="flex flex-col gap-4 group cursor-pointer">
            <div className="aspect-16/10 bg-brown-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 border border-brown-200">
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
        </Link>
    );
}

