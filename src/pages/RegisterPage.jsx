import { useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.username.trim()) newErrors.username = "Username is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email must be a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Mock API call
            console.log("Registering", formData);
            setIsSuccess(true);
        }
    };

    if (isSuccess) {
        return (
            <AuthLayout>
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-8">
                    <div className="w-16 h-16 bg-[#18B978] rounded-full flex items-center justify-center mb-2">
                        <Check className="text-white w-8 h-8" strokeWidth={3} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">Registration success</h2>
                    <Button
                        asChild
                        className="rounded-full px-12 py-6 bg-black text-white hover:bg-gray-800 mt-4 text-lg font-medium"
                    >
                        <Link to="/login">Continue</Link>
                    </Button>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Sign up</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 ml-1">Name</label>
                    <Input
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        error={!!errors.name}
                    />
                    {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 ml-1">Username</label>
                    <Input
                        placeholder="Username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        error={!!errors.username}
                    />
                    {errors.username && <p className="text-red-500 text-xs ml-1">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500 ml-1">Email</label>
                    <Input
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={!!errors.email}
                    />
                    {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
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
                    {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password}</p>}
                </div>

                <div className="pt-4">
                    <Button type="submit" className="w-full rounded-full py-6 bg-black text-white hover:bg-gray-800 text-base font-medium">
                        Sign up
                    </Button>
                </div>

                <div className="text-center text-sm text-gray-500">
                    Already have an account? <Link to="/login" className="font-bold text-gray-800 hover:underline">Log in</Link>
                </div>
            </form>
        </AuthLayout>
    );
}
