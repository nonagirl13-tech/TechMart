"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://ecommerce.routemisr.com/api/v1/orders",
          {
            headers: {
              "Content-Type": "application/json",
              token: token || "",
            },
          }
        );

        const data = await res.json();

        console.log(data);

        setOrders(data.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order._id} href={`/orders/${order._id}`}>
              <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer">
                
                <div className="flex justify-between mb-2">
                  <p className="font-semibold">
                    Order #{order._id.slice(-6)}
                  </p>

                  <span
                    className={`text-sm px-2 py-1 rounded ${
                      order.isDelivered
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>Total: {order.totalOrderPrice} EGP</p>
                  <p>Payment: {order.paymentMethodType}</p>
                  <p>Items: {order.cartItems?.length || 0}</p>
                </div>

              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}