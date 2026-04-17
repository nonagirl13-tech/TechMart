"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SuccessPage() {
return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
    
    <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
    >
        <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-green-600"
        >
        🎉 Order Placed Successfully
        </motion.h1>

        <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-muted-foreground"
        >
        Thank you for your order!
        </motion.p>

        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        >
        <Link href="/products">
            <Button className="mt-6 transition-transform hover:scale-105">
            Continue Shopping
            </Button>
        </Link>
        </motion.div>
    </motion.div>

    </div>
);
}