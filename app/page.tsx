"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        const data = await res.json();
        setBrands(data.data.slice(0, 6));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, []);

  return (
    <div className="space-y-16">

      {/* 🎯 HERO SECTION */}
      <section className="bg-black text-white py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to TECKMART
        </h1>
        <p className="text-gray-300 mt-4">
          Discover the best products at the best prices
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          <Link
            href="/products"
            className="bg-white text-black px-6 py-2 rounded"
          >
            Shop Now
          </Link>

          <Link
            href="/categories"
            className="border border-white px-6 py-2 rounded"
          >
            Explore Categories
          </Link>
        </div>
      </section>

      {/* 🧩 BRANDS SECTION */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Top Brands</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="border p-4 rounded-lg flex flex-col items-center hover:shadow-md transition"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="h-16 object-contain"
                />
                <p className="text-sm mt-2">{brand.name}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 🛍 CTA SECTION */}
      <section className="bg-gray-100 py-16 text-center">
        <h2 className="text-2xl font-bold">
          Start Shopping Now 🚀
        </h2>

        <Link
          href="/products"
          className="inline-block mt-4 bg-black text-white px-6 py-2 rounded"
        >
          Browse Products
        </Link>
      </section>

    </div>
  );
}
