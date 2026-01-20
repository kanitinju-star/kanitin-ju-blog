import React from "react";
import { cn } from "@/lib/utils";
export function HeroSection() {
    return (
        <section className="w-full px-6 py-12 md:px-12 lg:px-24 bg-brown-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-center lg:text-left">
                {/* Heading & Text */}
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

                {/* Image Placeholder */}
                <div className="lg:col-span-4 relative aspect-3/4 max-w-sm mx-auto w-full group">
                    <div className="absolute inset-0 bg-brown-300 rounded-2xl overflow-hidden shadow-xl transition-all duration-500 group-hover:scale-[1.02] border border-brown-200 flex items-center justify-center">
                        {/* If image exists, it will cover the placeholder */}
                        <img
                            src=""
                            alt="Hero Placeholder"
                            className="absolute inset-0 w-full h-full object-cover z-10 empty:invisible"
                        />
                        <div className="text-brown-400 font-bold italic z-0">
                            Hero Image
                        </div>
                    </div>
                </div>

                {/* Author Info Placeholder */}
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