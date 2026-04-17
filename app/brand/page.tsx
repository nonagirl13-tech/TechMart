"use client";

import { useEffect, useState } from "react";

export default function BrandPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        const data = await res.json();

        setBrands(data.data);
      } catch (error) {
        console.log("Error fetching brands");
      } finally {
        setLoading(false);
      }
    }

    fetchBrands();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Brands</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="border rounded-lg p-4 flex flex-col items-center hover:shadow-md transition"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="w-20 h-20 object-contain mb-3"
            />
            <p className="text-sm font-medium">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}