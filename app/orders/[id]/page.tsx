"use client";

import { useEffect, useState } from "react";

export default function OrderDetails({ params }: any) {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/orders",
          {
            headers: {
              token: token || "",
            },
          }
        );

        const data = await res.json();

        const foundOrder = data.data.find(
          (o: any) => o._id === params.id
        );

        setOrder(foundOrder);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [params.id]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (!order) return <p className="p-6">Order not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Order #{order._id.slice(-6)}
      </h1>

      <div className="border rounded-lg p-5 space-y-3">
        <p>Total: {order.totalOrderPrice} EGP</p>
        <p>Payment: {order.paymentMethodType}</p>
        <p>
          Status: {order.isDelivered ? "Delivered" : "Processing"}
        </p>
      </div>

      <h2 className="text-xl font-bold mt-6 mb-3">Products</h2>

      <div className="space-y-3">
        {order.cartItems?.map((item: any) => (
          <div key={item._id} className="border p-3 rounded flex justify-between">
            <div>
              <p className="font-semibold">{item.product?.title}</p>
              <p className="text-sm text-gray-500">Qty: {item.count}</p>
            </div>

            <p className="font-bold">{item.price} EGP</p>
          </div>
        ))}
      </div>
    </div>
  );
}