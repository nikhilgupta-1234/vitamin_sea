"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Package,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Order {
  id: number;
  total: number;
  status: string;
  tracking_status?: string;
  created_at: string;
}

interface OrderItem {
  id: number;
  product_name: string;
  price: number;
  quantity: number;
  image: string;
}

const trackingSteps = [
  "Order Placed",
  "Confirmed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function OrderDetailsPage() {
  const params = useParams();

  const [order, setOrder] =
    useState<Order | null>(null);

  const [items, setItems] =
    useState<OrderItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const orderId = Number(params.id);

    const { data: orderData } =
      await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

    const { data: itemData } =
      await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

    if (orderData) {
      setOrder(orderData);
    }

    if (itemData) {
      setItems(itemData);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg text-gray-500">
          Loading order...
        </p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <h1 className="text-3xl font-bold">
          Order not found
        </h1>
      </main>
    );
  }

  const currentStep =
    trackingSteps.indexOf(
      order.tracking_status ||
        "Order Placed"
    );

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="rounded-[35px] bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-100">
                <Package
                  size={35}
                  className="text-sky-600"
                />
              </div>

              <div>
                <h1 className="text-4xl font-bold text-[#143D60]">
                  Order #{order.id}
                </h1>

                <div className="mt-2 flex items-center gap-2 text-gray-500">
                  <Calendar size={16} />
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </div>
              </div>
            </div>

            <span
              className={`rounded-full px-5 py-3 font-medium ${
                order.tracking_status ===
                "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.tracking_status ===
                      "Shipped" ||
                    order.tracking_status ===
                      "Out for Delivery"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.tracking_status ||
                order.status}
            </span>
          </div>
        </div>

        {/* Order Tracking */}
        <div className="mt-10 rounded-[35px] bg-white p-8 shadow-sm">
          <h2 className="mb-10 font-serif text-3xl text-[#143D60]">
            Order Tracking
          </h2>

          <div className="grid gap-8 md:grid-cols-5">
            {trackingSteps.map(
              (step, index) => {
                const completed =
                  index <= currentStep;

                return (
                  <div
                    key={step}
                    className="flex flex-col items-center text-center"
                  >
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full ${
                        completed
                          ? "bg-sky-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <CheckCircle size={28} />
                    </div>

                    <p
                      className={`mt-4 font-medium ${
                        completed
                          ? "text-sky-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Products */}
        <div className="mt-10 rounded-[35px] bg-white p-8 shadow-sm">
          <h2 className="mb-8 font-serif text-3xl text-[#143D60]">
            Ordered Products
          </h2>

          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-3xl border p-5 md:flex-row md:items-center"
              >
                <Image
                  src={
                    item.image ||
                    "/placeholder.png"
                  }
                  alt={item.product_name}
                  width={120}
                  height={120}
                  className="rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#143D60]">
                    {item.product_name}
                  </h3>

                  <p className="mt-2 text-gray-500">
                    Quantity: {item.quantity}
                  </p>

                  <p className="mt-2 font-bold text-sky-600">
                    ₹{item.price}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-[#143D60]">
                    ₹
                    {item.price *
                      item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="mt-10 rounded-[35px] bg-white p-8 shadow-sm">
          <h2 className="mb-6 font-serif text-3xl text-[#143D60]">
            Payment Summary
          </h2>

          <div className="flex justify-between text-lg">
            <span>Subtotal</span>
            <span>₹{order.total}</span>
          </div>

          <div className="mt-4 flex justify-between text-lg">
            <span>Shipping</span>
            <span className="text-green-600">
              Free
            </span>
          </div>

          <hr className="my-6" />

          <div className="flex justify-between text-3xl font-bold">
            <span>Total Paid</span>
            <span className="text-sky-600">
              ₹{order.total}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}