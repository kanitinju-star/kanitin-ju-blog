import { useState, useEffect, useRef } from "react";
import { ProfileLayout } from "../components/ProfileLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import client from "@/lib/axios";

export function ProfilePage() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        profilePic: ""
    });

    const [isSaving, setIsSaving] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await client.get("/auth/get-user");
                
                setFormData({
                    name: response.data.name || "",
                    username: response.data.username || "",
                    email: response.data.email || "",
                    profilePic: response.data.profilePic || ""
                });
            } catch (error) {
                console.error("Error fetching user:", error);
                toast.error("Failed to load profile data");
            }
        };
        fetchUser();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const token = localStorage.getItem("token");
            const data = new FormData();
            data.append("name", formData.name);
            data.append("username", formData.username);
            if (selectedFile) {
                data.append("profilePic", selectedFile);
            }

            const response = await client.put("/auth/profile", data);

            if (response.data.profilePic) {
                setFormData(prev => ({ ...prev, profilePic: response.data.profilePic }));
                setSelectedFile(null);
                setPreviewUrl(null);
            }

            toast.success("Saved profile", {
                description: "Your profile has been successfully updated",
                className: "bg-[#18B978] text-white border-none",
                descriptionClassName: "text-white/90"
            });
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error(error.response?.data?.error || "Failed to save profile");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <ProfileLayout>
            <div className="max-w-xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-display font-bold text-brown-600">Profile</h2>
                </div>

                <div className="space-y-8">
                    {/* Picture Upload */}
                    <div className="flex items-center gap-6 p-6 bg-brown-50/50 rounded-2xl border border-brown-100/50">
                        <div 
                            className="relative group cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Avatar className="w-20 h-20 border-2 border-white shadow-md">
                                <AvatarImage src={previewUrl || formData.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`} />
                                <AvatarFallback>{formData.name?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="text-white w-6 h-6" />
                            </div>
                            <input 
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div>
                            <Button 
                                variant="outline" 
                                className="rounded-full border-brown-200 text-brown-600 bg-white"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Upload profile picture
                            </Button>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brown-400 ml-1">Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="bg-[#Fdfdfd]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brown-400 ml-1">Username</label>
                            <Input
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="bg-[#Fdfdfd]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brown-400 ml-1">Email</label>
                            <Input
                                value={formData.email}
                                disabled
                                className="bg-gray-50 text-gray-500 cursor-not-allowed border-gray-100"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="rounded-full px-8 py-6 bg-black text-white hover:bg-gray-800 font-bold"
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            </div>
        </ProfileLayout>
    );
}
