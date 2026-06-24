"use client";

import { useContext, useState } from "react";
import { authContext, AuthContextType } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignInPage() {
  // 1. تعريف الـ router في بداية الدالة
  const router = useRouter();

  // 2. استدعاء الـ context
  const authContextData = useContext(authContext);

  // 3. التحقق من وجود الـ context
  if (!authContextData) {
    return null; 
  }

  const { login } = authContextData;

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // ✳️ validation
  function validate() {
    const newErrors: any = {};
    if (!form.email.includes("@")) {
      newErrors.email = "Email is invalid";
    }
    if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validation = validate();

    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      toast.error("Fix form errors");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
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
        toast.error(data.message || "Login failed");
        return;
      }

      // ✅ normalize response
      const user = data.user || data.data?.user;
      const token = data.token || data.data?.token;

      if (!user || !token) {
        toast.error("Invalid response from server");
        return;
      }

      // 🔐 save in context + localStorage
      login(user, token);

      // 🍪 save cookie
      document.cookie = `token=${token}; path=/`;

      toast.success("Logged in successfully 🎉");

      // 🚀 redirect
      router.push("/cart");

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            className="border p-2 w-full"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            className="border p-2 w-full"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <button
          disabled={loading}
          className="bg-black text-white w-full p-2 rounded"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}