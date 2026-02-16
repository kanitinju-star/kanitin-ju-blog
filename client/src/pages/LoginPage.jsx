import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            if (formData.password === "password") {
                console.log("Logged in", formData);
                // Simulate login
                localStorage.setItem("authToken", "true");
                window.dispatchEvent(new Event("storage")); // Notify other components
                toast.success("Login successful!");
                setTimeout(() => {
                    navigate("/");
                }, 800);
            } else {
                toast.error("Your password is incorrect or this email doesn't exist", {
                    className: "bg-red-500 text-white border-none",
                    descriptionClassName: "text-white/90"
                });
                setErrors({
                    email: " ",
                    password: " "
                });
            }
        }
    };

    return (
        <AuthLayout>
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Log in</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 ml-1">Email</label>
                    <Input
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={!!errors.email}
                    />
                    {errors.email && errors.email.length > 1 && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 ml-1">Password</label>
                    <Input
                        placeholder="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        error={!!errors.password}
                    />
                    {errors.password && errors.password.length > 1 && <p className="text-red-500 text-xs ml-1">{errors.password}</p>}
                </div>

                <div className="pt-4">
                    <Button type="submit" className="w-full rounded-full py-6 bg-black text-white hover:bg-gray-800 text-base font-medium">
                        Log in
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                    Don't have any account? <Link to="/register" className="font-bold text-gray-800 hover:underline">Sign up</Link>
                </div>
            </form>
        </AuthLayout>
    );
}
