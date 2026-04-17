"use client";

import { apiServices } from "@/services/api";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState, useContext } from "react";
import { toast } from "sonner";
import { cartContext } from "@/contexts/cartContext";

interface AddToCartBtnProps {
size?: "default" | "sm" | "lg" | "icon";
productId: string;
}

export default function AddToCartBtn({
size = "default",
productId,
}: AddToCartBtnProps) {
const [isLoading, setIsLoading] = useState(false);
const { setCartCount } = useContext(cartContext);

async function handleAddToCart() {
    try {
    setIsLoading(true);

    const response = await apiServices.addProductToCart(productId);

    toast.success(response.message || "Product added to cart!", {
        style: {
        color: "white",
        backgroundColor: "green",
        },
    });

    
    setCartCount?.(response.numOfCartItems);

    } catch (error) {
    console.error(error);
    toast.error("Failed to add product to cart");
    } finally {
    setIsLoading(false);
    }
}

return (
    <Button
    onClick={handleAddToCart}
    disabled={isLoading}
    size={size}
    className="flex gap-2"
    >
    {isLoading ? (
        <Loader2 className="animate-spin size-4" />
) : (
        <ShoppingCart className="size-4" />
    )}

    Add To Cart
    </Button>
);
}