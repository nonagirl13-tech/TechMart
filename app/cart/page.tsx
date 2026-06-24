"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { apiServices } from "@/services/api";
import { useState, useContext, useEffect } from "react"; 
import CartProduct from "@/components/products/CartProduct";
import { Loader2, Trash2, ShoppingCart as ShoppingCartIcon } from "lucide-react"; 
import toast from "react-hot-toast";
import { cartContext } from "@/contexts/cartContext";
import { GetUserCartResponse } from "@/interfaces/cart/CartProduct";

export default function Cart() {
    // 1. استدعاء الـ Context
    const { cartData, isLoading, setCartCount } = useContext(cartContext) as any;
    
    // 2. تعريف الـ States فوق خالص في البداية منعاً لأي تعارض
    const [innerCartData, setInnerCartData] = useState<GetUserCartResponse | null>(null);
    const [isClearing, setIsClearing] = useState(false);

    // 3. تحديث الـ State المبدئي
    useEffect(() => {
        if (cartData) {
            setInnerCartData(cartData);
        }
    }, [cartData]);

    // 4. تحديث رقم الـ Badge في الـ Navbar
    useEffect(() => {
        if (innerCartData && setCartCount) {
            setCartCount(innerCartData.numOfCartItems);
        }
    }, [innerCartData, setCartCount]);

    // شاشة التحميل
    if (isLoading || !innerCartData) {
        return <div className="text-center py-10">Loading cart...</div>;
    }

    // الدالة الخاصة بحذف منتج واحد
    async function removeProductFromCart(productId: string) {
        const response = await apiServices.removeProductFromCart(productId);
        setInnerCartData(response);
        toast.success("Item removed successfully");
    }

    // الدالة الخاصة بمسح السلة كلها
    async function clearCart() {
        setIsClearing(true);
        const response = await apiServices.clearCart();
        setInnerCartData(response as any);
        setIsClearing(false);
        toast.success("Cart cleared successfully");
    }

    // الدالة الخاصة بتحديث الكمية
    async function updateProductCount(productId: string, count: number) {
        const response = await apiServices.updateProductCount(productId, count);
        setInnerCartData(response as any);
        toast.success(response.message || "Updated successfully", {
            style: { color: "white", backgroundColor: "green" },
        });
    }

    // شرط السلة الفاضية
    if (innerCartData.numOfCartItems === 0) {
        return (
            <section className="py-20">
                <div className="container max-w-lg text-center">
                    <h1 className="mb-4 text-2xl font-semibold">Your cart is empty</h1>
                    <p className="mb-8 text-muted-foreground">Looks like you haven't added anything yet.</p>
                    <Button asChild>
                        <Link href="/products">Continue Shopping</Link>
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <section className="py-10">
            <div className="container grid gap-8">
                <h1 className="mb-8 text-3xl font-semibold">Shopping Cart</h1>
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {innerCartData.data.products.map((item: any) => (
                                <CartProduct
                                    key={item._id || item.product._id}
                                    removeProductFromCart={removeProductFromCart}
                                    updateProductCount={updateProductCount}
                                    item={item}
                                />
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            className="mt-6 w-fit px-8 bg-red-600 text-white hover:bg-red-700"
                            onClick={clearCart}
                            disabled={isClearing}
                        >
                            {isClearing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Clear Cart
                        </Button>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="flex items-center gap-1.5 text-muted-foreground">
                                        <ShoppingCartIcon className="size-4" />
                                        {innerCartData.numOfCartItems} {innerCartData.numOfCartItems === 1 ? "item" : "items"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>{formatPrice(innerCartData.data.totalCartPrice)}</span>
                                </div>
                            </div>
                            <Link href="/checkout">
                                <Button size="lg" className="mt-6 w-full">
                                    Proceed to Checkout
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}