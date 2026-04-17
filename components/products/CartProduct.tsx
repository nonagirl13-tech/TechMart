"use client";

import React, { useState } from "react";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { CartProduct as ICartProduct } from "@/interfaces/cart/CartProduct";
import Image from "next/image";

export default function CartProduct({
  item,
  removeProductFromCart,
  updateProductCount,
}: {
  item: ICartProduct;
  removeProductFromCart: (productId: string) => Promise<void>;
  updateProductCount: (productId: string, count: number) => Promise<void>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [isDecreasing, setIsDecreasing] = useState(false);

  
  if (!item?.product) return null;

  async function handleRemoveProductFromCart() {
    setIsDeleting(true);
    await removeProductFromCart(item.product._id);
    setIsDeleting(false);
  }

  async function handleUpdateProductCount(count: number) {
    if (count > item.count) {
      setIsIncreasing(true);
    } else {
      setIsDecreasing(true);
    }

    setIsUpdating(true);
    await updateProductCount(item.product._id, count);
    setIsUpdating(false);
    setIsIncreasing(false);
    setIsDecreasing(false);
  }

  return (
    <div className="flex gap-4 rounded-lg border bg-card p-4">
      <div className="w-24 shrink-0">
        <AspectRatio ratio={1} className="overflow-hidden rounded-md bg-muted">
          <Image
            src={item.product.imageCover || "/placeholder.png"}
            alt={item.product.title || "product"}
            width={100}
            height={100}
            className="size-full object-cover"
          />
        </AspectRatio>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <Link href={`/products/${item.product._id}`}>
          <h3 className="font-medium">{item.product.title}</h3>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            disabled={item.count === 1 || isUpdating}
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handleUpdateProductCount(item.count - 1)}
          >
            {isDecreasing ? (
              <Loader2 className="animate-spin size-3" />
            ) : (
              <Minus className="size-3" />
            )}
          </Button>

          <span className="w-8 text-center">{item.count}</span>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => handleUpdateProductCount(item.count + 1)}
            disabled={isUpdating}
          >
            {isIncreasing ? (
              <Loader2 className="animate-spin size-3" />
            ) : (
              <Plus className="size-3" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="text-right">
          <p className="font-semibold">
            {formatPrice(item.price)} each
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={handleRemoveProductFromCart}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="mr-1 size-4 animate-spin" />
          ) : (
            <Trash2 className="mr-1 size-4" />
          )}
          Remove
        </Button>
      </div>
    </div>
  );
}