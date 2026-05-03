import { useState, useEffect, useRef } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import client from "@/lib/axios";

export function AdminProfilePage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        profilePic: ""
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await client.get("/auth/get-user", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                setFormData({
                    name: response.data.name || "",
                    username: response.data.username || "",
                    email: response.data.email || "",
                    profilePic: response.data.profilePic || ""
                });
            } catch (error) {
                console.error("Error fetching user:", error);
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
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const data = new FormData();
            data.append("name", formData.name);
            data.append("username", formData.username);
            if (selectedFile) {
                data.append("profilePic", selectedFile);
            }

            const response = await client.put("/auth/profile", data, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

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
            setLoading(false);
        }
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
                            <AvatarImage src={previewUrl || formData.profilePic || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`} />
                            <AvatarFallback>{formData.name?.charAt(0) || "A"}</AvatarFallback>
                        </Avatar>
                        <input 
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <Button 
                            variant="outline" 
                            className="rounded-full border-brown-200 text-brown-600 hover:bg-brown-50 px-6 font-medium text-body-2"
                            onClick={() => fileInputRef.current?.click()}
                        >
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
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
