"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { apiServices } from "@/services/api";
import { toast } from "sonner";

const formatPrice = (price: number) => price.toFixed(2);

export interface ProductCardProps {
  name?: string;
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
  freeShipping?: boolean;
  id: string;
}

export function ProductCard({
  name = "Premium Wool Sweater",
  price = 89.99,
  originalPrice = 129.99,
  rating = 4.8,
  reviewCount = 142,
  images = ["/logo.svg", "/logo.svg", "/logo.svg"],
  colors = ["#1e293b", "#a855f7", "#0ea5e9", "#84cc16"],
  isNew = true,
  isBestSeller = true,
  discount = 30,
  freeShipping = true,
  id,
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor] = useState<string | undefined>(colors[0]);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  const handleAddToCart = async () => {
    if (!token) {
      toast.error("You must sign in first to continue");
      return;
    }

    if (isAddedToCart) return;

    try {
      setIsAddingToCart(true);

      const response = await apiServices.addProductToCart(id);

      toast.success(response.message, {
        style: { color: "green" },
      });

      setIsAddedToCart(true);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsAddingToCart(false);
    }

    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  return (
    <Card className="w-full max-w-sm overflow-hidden group bg-background text-foreground shadow-xl hover:shadow-lg transition-all duration-300 rounded-md p-0">
      <div className="relative aspect-3/4 overflow-hidden">
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt={`${name} - View ${currentImageIndex + 1}`}
          className="object-cover w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="icon" onClick={prevImage}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={nextImage}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="secondary"
          size="icon"
          className={`absolute top-3 right-3 ${
            isWishlisted ? "text-rose-500" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? "fill-rose-500" : ""
            }`}
          />
        </Button>
      </div>

      <CardContent className="p-4">
        <Link href={`/products/${id}`} className="font-medium">
          {name}
        </Link>

        <div className="flex items-center gap-2 mt-2">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>{rating}</span>
        </div>

        <div className="mt-2">
          <span className="font-bold">${formatPrice(price)}</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAddingToCart || isAddedToCart || !token}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : isAddedToCart ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added
            </>
          ) : !token ? (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Sign in to add
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}