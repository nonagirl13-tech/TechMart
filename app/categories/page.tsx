"use client";

import { useEffect, useState } from "react";
import { apiServices } from "@/services/api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await apiServices.getCategories();
        setCategories(data);
    } finally {
        setLoading(false);
    }
    }

    fetchData();
}, []);

if (loading) return <p className="p-6">Loading...</p>;

return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Categories</h1>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
        <div key={cat._id} className="border rounded p-4 text-center">
            <img
            src={cat.image}
            alt={cat.name}
            className="h-24 mx-auto object-contain"
            />
            <p className="mt-2 font-medium">{cat.name}</p>
        </div>
        ))}
    </div>
    </div>
);
}