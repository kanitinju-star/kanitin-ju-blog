import { AdminLayout } from "@/components/AdminLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function AdminNotificationPage() {
    // Mock Data
    const notifications = [
        {
            id: 1,
            user: "Jacob Lash",
            avatar: "Jacob",
            action: "commented on your article: The Fascinating World of Cats: Why We Love Our Furry Friends",
            time: "2 hours ago",
            isUnread: true
        },
        {
            id: 2,
            user: "Jacob Lash",
            avatar: "Jacob",
            action: "liked your article: The Fascinating World of Cats: Why We Love Our Furry Friends",
            time: "2 hours ago",
            isUnread: true
        },
        {
            id: 3,
            user: "Mimi mama",
            avatar: "Mimi",
            action: "commented on your article: Understanding Girlhood Reformation: Why we redefine...",
            time: "1 day ago",
            isUnread: false
        }
    ];

    return (
        <AdminLayout>
            <div className="max-w-3xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Notification</h1>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
                    {notifications.length > 0 ? (
                        notifications.map((item) => (
                            <div key={item.id} className="p-6 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
                                <Avatar className="w-12 h-12 border border-gray-100">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.avatar}`} />
                                    <AvatarFallback>{item.avatar[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 pt-1">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="space-y-1">
                                            <p className="text-gray-800 text-sm leading-relaxed">
                                                <span className="font-bold">{item.user}</span> {item.action}
                                            </p>
                                            <p className="text-xs text-brown-400 font-medium">{item.time}</p>
                                        </div>
                                        {item.isUnread && (
                                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0" />
                                        )}
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                                        View
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-400">
                            No notifications yet.
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
