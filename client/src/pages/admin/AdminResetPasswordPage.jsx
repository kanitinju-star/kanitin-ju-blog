import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import client from "@/lib/axios";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function AdminResetPasswordPage() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleReset = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }
        if (!formData.currentPassword || !formData.newPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            await client.put("/auth/reset-password", {
                oldPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });

            toast.success("Password reset successfully!");
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error(error.response?.data?.error || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-headline-3 text-brown-600">Reset password</h1>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                className="rounded-full bg-brown-600 !text-white hover:bg-brown-500 px-6 font-medium text-body-2"
                                disabled={loading}
                            >
                                {loading ? "Resetting..." : "Reset password"}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white rounded-3xl p-8 max-w-sm border-brown-100">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-center text-headline-3 text-brown-600">Reset password</AlertDialogTitle>
                                <AlertDialogDescription className="text-center text-body-1 text-brown-400 py-2">
                                    Do you want to reset your password?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="sm:justify-center gap-4 pt-4">
                                <AlertDialogCancel className="rounded-full border-brown-200 px-8 hover:bg-brown-100 text-brown-600 text-body-2 font-semibold">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleReset}
                                    className="rounded-full bg-brown-600 !text-white hover:bg-brown-500 px-8 text-body-2 font-semibold"
                                >
                                    Reset
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>

                {/* Form Content */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brown-100 space-y-8">
                    <div className="space-y-6">
                        {/* Current Password */}
                        <div className="space-y-2">
                            <label className="text-body-2 font-medium text-brown-400 ml-1">Current password</label>
                            <Input
                                type="password"
                                placeholder="Current password"
                                value={formData.currentPassword}
                                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 placeholder:text-brown-300 text-body-1"
                            />
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-body-2 font-medium text-brown-400 ml-1">New password</label>
                            <Input
                                type="password"
                                placeholder="New password"
                                value={formData.newPassword}
                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 placeholder:text-brown-300 text-body-1"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-body-2 font-medium text-brown-400 ml-1">Confirm new password</label>
                            <Input
                                type="password"
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="bg-brown-100/50 border-none rounded-xl p-6 shadow-none focus-visible:ring-1 focus-visible:ring-brown-200 text-brown-600 placeholder:text-brown-300 text-body-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
