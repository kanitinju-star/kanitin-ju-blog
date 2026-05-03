import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import client from "@/lib/axios";
import { formatDate } from "@/lib/dateUtils";
import { useNavigate } from "react-router-dom";

export function AdminNotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await client.get("/notifications");
            setNotifications(Array.isArray(response.data) ? response.data : []);
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
            await client.put(`/notifications/${id}/read`);
            
            // Optimistic update
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
            case 'like': return "liked your article:";
            case 'comment': return "commented on your article:";
            case 'new_article': return "published a new article:";
            default: return "interacted with your article:";
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Notification</h1>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                    {loading ? (
                        <div className="p-12 text-center text-gray-400">Loading...</div>
                    ) : notifications.length > 0 ? (
                        notifications.map((item) => (
                            <div 
                                key={item.id} 
                                className={`p-6 flex items-start gap-4 hover:bg-gray-50/50 transition-colors ${!item.is_read ? 'bg-brown-50/20' : ''}`}
                            >
                                <Avatar className="w-12 h-12 border border-gray-100">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.actor_name}`} />
                                    <AvatarFallback>{item.actor_name?.[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 pt-1">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-1">
                                            <p className="text-gray-800 text-sm leading-relaxed">
                                                <span className="font-bold">{item.actor_name}</span> {getActionText(item.action_type)} <span className="font-medium text-brown-600">{item.post_title}</span>
                                            </p>
                                            <p className="text-xs text-brown-400 font-medium">
                                                {item.created_at ? new Date(item.created_at).toLocaleString() : ""}
                                            </p>
                                        </div>
                                        {!item.is_read && (
                                            <div className="w-2.5 h-2.5 bg-red-500 rounded-full mt-2 shrink-0 shadow-sm" title="Unread" />
                                        )}
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="text-brown-400 hover:text-brown-600 hover:bg-brown-50"
                                        onClick={() => handleMarkAsRead(item.id, item.post_id)}
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-400 font-medium">
                            No notifications yet.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
