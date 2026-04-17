"use client";

import { MenuIcon, ShoppingCart, Store } from "lucide-react";
import { useContext } from "react";
import { cartContext } from "@/contexts/cartContext";
import { authContext } from "@/contexts/authContext";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const { cartCount } = useContext(cartContext);
  const { user, logout } = useContext(authContext);

  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-black flex items-center justify-center">
              <Store className="w-4 h-4 text-white" />
            </div>

            <span className="text-lg font-bold tracking-tight">TECKMART</span>
          </Link>

          {/* Desktop Menu */}
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/products" className={navigationMenuTriggerStyle()}>
                  Products
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  href="/categories"
                  className={navigationMenuTriggerStyle()}
                >
                  Categories
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/brand" className={navigationMenuTriggerStyle()}>
                  Brands
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/orders" className={navigationMenuTriggerStyle()}>
                  Orders
                </Link>
              </NavigationMenuItem>

              {/* Cart */}
              <NavigationMenuItem>
                <Link href="/cart" className="relative flex items-center gap-1">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                      {cartCount}
                    </span>
                  )}
                  Cart
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden items-center gap-4 lg:flex">
            {user ? (
              <>
                <span className="text-sm font-medium">Hi, {user?.name}</span>

                <Button variant="destructive" onClick={logout}>
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/signin">
                  <Button variant="outline">Sign in</Button>
                </Link>

                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>

            <SheetContent side="top">
              <SheetHeader>
                <SheetTitle>TECKMART</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col p-4 gap-4">
                <Link href="/">Home</Link>
                <Link href="/products">Products</Link>
                <Link href="/categories">Categories</Link>
                <Link href="/brand">Brands</Link>
                <Link href="/orders">Orders</Link>

                {/* Cart */}
                <Link href="/cart" className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Cart
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Auth Mobile */}
                {user ? (
                  <>
                    <p className="text-sm">Hi, {user?.name}</p>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={logout}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/signin">
                      <Button variant="outline" className="w-full">
                        Sign in
                      </Button>
                    </Link>

                    <Link href="/signup">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
}
