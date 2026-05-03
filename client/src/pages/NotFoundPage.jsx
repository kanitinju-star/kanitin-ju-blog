import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <AlertCircle size={64} className="text-brown-300 mb-6" />
            <h1 className="text-display font-bold text-brown-600 mb-4">Page Not Found</h1>
            <p className="text-body-1 text-brown-400 mb-8 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily available.
            </p>
            <Link
                to="/"
                className="px-8 py-3 bg-black text-white rounded-full font-bold text-body-1 hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
                Go to Homepage
            </Link>
        </div>
    );
}
