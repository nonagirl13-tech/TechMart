"use client";

import { useContext, useState } from "react";
import { authContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUpPage() {
  const { login } = useContext(authContext);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // 🔥 Validation قوي
  function validate() {
    const newErrors: any = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Password
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm Password
    if (!form.rePassword) {
      newErrors.rePassword = "Please confirm password";
    } else if (form.password !== form.rePassword) {
      newErrors.rePassword = "Passwords do not match";
    }

    // Phone
    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/; // Egyptian numbers
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Invalid Egyptian phone number";
    }

    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix form errors");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      const user = data.user || data.data?.user;
      const token = data.token || data.data?.token;

      if (!user || !token) {
        toast.error("Invalid server response");
        return;
      }

      login(user, token);

      toast.success("Account created successfully 🎉");

      router.push("/");

    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Confirm Password"
          value={form.rePassword}
          onChange={(e) => setForm({ ...form, rePassword: e.target.value })}
        />
        {errors.rePassword && (
          <p className="text-red-500 text-sm">{errors.rePassword}</p>
        )}

        <input
          className="border p-2 w-full"
          placeholder="Phone (01xxxxxxxxx)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <button
          disabled={loading}
          className="bg-black text-white w-full p-2 rounded"
        >
          {loading ? "Loading..." : "Create Account"}
        </button>

      </form>
    </div>
  );
}