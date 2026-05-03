import { useState, useEffect } from "react";
import { ProfileLayout } from "../components/ProfileLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import client from "@/lib/axios";
import { useNavigate } from "react-router-dom";

export function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            
            const response = await client.get("/notifications", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNotifications(response.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleMarkAsRead = async (id, postId) => {
        try {
            const token = localStorage.getItem("token");
            await client.put(`/notifications/${id}/read`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
            
            if (postId) {
                navigate(`/post/${postId}`);
            }
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const getActionText = (type) => {
        switch (type) {
            case 'new_article': return "published a new article:";
            case 'comment': return "replied to your comment:"; // Or commented on your post
            default: return "sent you a notification:";
        }
    };

    return (
        <ProfileLayout>
            <div className="space-y-6">
                <h2 className="text-display font-bold text-brown-600">Notifications</h2>

                <div className="space-y-4">
                    {loading ? (
                        <div className="py-12 text-center text-brown-400">Loading notifications...</div>
                    ) : notifications.length > 0 ? (
                        notifications.map((item) => (
                            <div 
                                key={item.id} 
                                className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                                    !item.is_read 
                                    ? 'bg-brown-50/30 border-brown-100 shadow-sm' 
                                    : 'bg-white border-transparent'
                                }`}
                            >
                                <Avatar className="w-10 h-10 border border-white shadow-sm">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.actor_name}`} />
                                    <AvatarFallback>{item.actor_name?.[0]}</AvatarFallback>
                                </Avatar>
                                
                                <div className="flex-1 space-y-1">
                                    <p className="text-body-2 text-brown-600">
                                        <span className="font-bold">{item.actor_name}</span> {getActionText(item.action_type)}
                                        <br />
                                        <span className="font-medium text-brown-400">"{item.post_title}"</span>
                                    </p>
                                    <p className="text-[10px] text-brown-300 font-medium">
                                        {item.created_at ? new Date(item.created_at).toLocaleString() : ""}
                                    </p>
                                </div>

                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="text-brown-400 hover:text-brown-600 rounded-full"
                                    onClick={() => handleMarkAsRead(item.id, item.post_id)}
                                >
                                    View
                                </Button>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center text-brown-400 font-medium bg-brown-50/20 rounded-2xl border border-dashed border-brown-100">
                            No notifications yet
                        </div>
                    )}
                </div>
            </div>
        </ProfileLayout>
    );
}
