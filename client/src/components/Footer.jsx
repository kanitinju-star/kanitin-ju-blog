import React from "react";
import { Linkedin, Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";   
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