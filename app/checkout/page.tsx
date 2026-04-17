"use client";

import { useEffect, useState } from "react";
import { apiServices } from "@/services/api";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await apiServices.getCart();
        setCart(data);
      } catch (error) {
        toast.error("Failed to load cart");
      }
    }

    fetchCart();
  }, []);

  function validateForm(formData: FormData) {
    const newErrors: any = {};

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;

    if (!name || name.length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!email || !email.includes("@")) newErrors.email = "Invalid email";
    if (!phone || phone.length < 10) newErrors.phone = "Invalid phone number";
    if (!address || address.length < 5) newErrors.address = "Address is required";

    return newErrors;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix form errors");
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await apiServices.clearCart();
      toast.success("Order placed successfully 🎉");
      router.push("/success");
      setCart(null);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (!cart) return <p>Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto p-6"
    >
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Cart Summary */}
      <div className="border p-4 rounded mb-6">
        <p>Items: {cart.numOfCartItems}</p>
        <p>Total: {formatPrice(cart.data.totalCartPrice)}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">

        <input name="name" className="border p-2 w-full" placeholder="Name" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input name="email" className="border p-2 w-full" placeholder="Email" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input name="phone" className="border p-2 w-full" placeholder="Phone" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

        <input name="address" className="border p-2 w-full" placeholder="Address" />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

        <Button
          className="w-full transition-all duration-200 hover:scale-[1.02]"
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Order"}
        </Button>
      </form>
    </motion.div>
  );
}