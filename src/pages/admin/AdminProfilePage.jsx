import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export function AdminProfilePage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "Thompson P.",
        username: "Thompson",
        email: "thompson.p@gmail.com",
        bio: "I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.\n\nWhen I'm not writing, I spends time volunteering at my local animal shelter, helping cats find loving homes."
    });

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            toast.custom((t) => (
                <div className="bg-[#12B279] border-none rounded-xl p-4 shadow-lg w-full max-w-md flex items-start justify-between">
                    <div className="space-y-1">
                        <h3 className="text-white font-bold text-body-1">Saved profile</h3>
                        <p className="text-white/90 text-body-2">Your profile has been successfully updated</p>
                    </div>
                    <button
                        onClick={() => toast.dismiss(t)}
                        className="text-white/80 hover:text-white transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                    </button>
                </div>
            ));
        }, 1000);
    };

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto space-y-8 pb-12">
                <div className="flex items-center justify-between">
                    <h1 className="text-headline-3 text-brown-600">Profile</h1>
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="rounded-full bg-brown-600 !text-white hover:bg-brown-500 px-8 font-medium text-body-2"
                    >
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brown-100 space-y-8">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-6">
                        <Avatar className="w-24 h-24 border-4 border-brown-50">
                            <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop" />
                            <AvatarFallback>TP</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" className="rounded-full border-brown-200 text-brown-600 hover:bg-brown-50 px-6 font-medium text-body-2">
                            Upload profile picture
                        </Button>
                    </div>

                    <div className="space-y-6 max-w-2xl">
                        <div className="space-y-2">
                            <label className="text-body-2 font-medium text-brown-400 ml-1">Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 text-body-1"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-body-2 font-medium text-brown-400 ml-1">Username</label>
                            <Input
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 text-body-1"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-body-2 font-medium text-brown-400 ml-1">Email</label>
                            <Input
                                value={formData.email}
                                disabled
                                className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none text-brown-400 text-body-1"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-body-2 font-medium text-brown-400 ml-1">Bio (max 120 letters)</label>
                            <Textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="min-h-[120px] bg-brown-100/50 border-none rounded-xl p-4 shadow-none resize-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 text-body-1 leading-relaxed"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
