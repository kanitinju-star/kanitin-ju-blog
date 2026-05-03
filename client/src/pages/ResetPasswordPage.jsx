import { useState } from "react";
import { ProfileLayout } from "../components/ProfileLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import client from "@/lib/axios";

export function ResetPasswordPage() {
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!passwords.current || !passwords.new || !passwords.confirm) {
            toast.error("Please fill in all fields");
            return;
        }
        if (passwords.new !== passwords.confirm) {
            toast.error("Passwords do not match");
            return;
        }
        setShowConfirm(true);
    };

    const handleConfirmReset = async () => {
        setLoading(true);
        setShowConfirm(false);
        try {
            await client.put("/auth/reset-password", {
                oldPassword: passwords.current,
                newPassword: passwords.new
            });

            setPasswords({ current: "", new: "", confirm: "" });
            toast.success("Reset password", {
                description: "Your password has been successfully updated",
                className: "bg-white text-black border border-gray-200",
            });
        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error(error.response?.data?.error || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProfileLayout>
            <div className="max-w-xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-display font-bold text-brown-600">Reset password</h2>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brown-400 ml-1">Current password</label>
                        <Input
                            type="password"
                            placeholder="Current password"
                            value={passwords.current}
                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                        />
                    </div>
                    <div className="bg-brown-50/30 p-6 rounded-2xl space-y-5 border border-brown-100/50">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brown-400 ml-1">New password</label>
                            <Input
                                type="password"
                                placeholder="New password"
                                value={passwords.new}
                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brown-400 ml-1">Confirm new password</label>
                            <Input
                                type="password"
                                placeholder="Confirm new password"
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="rounded-full px-8 py-6 bg-black text-white hover:bg-gray-800 font-bold"
                        >
                            {loading ? "Resetting..." : "Reset password"}
                        </Button>
                    </div>
                </div>

                {/* Confirmation Dialog */}
                <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                    <AlertDialogContent className="bg-white rounded-2xl max-w-sm">
                        <AlertDialogHeader className="text-center">
                            <AlertDialogTitle className="text-xl font-bold">Reset password</AlertDialogTitle>
                            <AlertDialogDescription className="text-center">
                                Do you want to reset your password?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="sm:justify-center gap-2 mt-4">
                            <AlertDialogCancel className="rounded-full border-none shadow-none hover:bg-gray-100">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleConfirmReset}
                                className="rounded-full bg-black text-white hover:bg-gray-800 px-8"
                            >
                                Reset
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </ProfileLayout>
    );
}
