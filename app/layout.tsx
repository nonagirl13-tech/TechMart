import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";

import CartContextProvider from "@/contexts/cartContext";
import AuthProvider from "@/contexts/authContext";

const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const GeistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "teckmart",
  description: "وصف المتجر هنا",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        {/* Providers Layer */}
        <AuthProvider>
          <CartContextProvider>

            {/* Layout */}
            <Navbar />

            <main>{children}</main>

            <Footer />
            <Toaster />

          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
