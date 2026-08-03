"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Calendar,
  ChevronRight,
  CreditCard,
  Truck,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Order {
  id: number;
  total: number;
  status: string;
  payment_status?: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", {
        ascending: false,
      });

    setOrders(data || []);
    setLoading(false);
  }

  function statusColor(status: string) {
    switch ((status || "").toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "processing":
        return "bg-purple-100 text-purple-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />
          <p className="mt-5 text-gray-500">
            Loading your orders...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-sky-500 to-cyan-500 py-20 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <h1 className="font-serif text-6xl">
            My Orders
          </h1>

          <p className="mt-4 text-lg text-sky-100">
            View your purchase history and track every order.
          </p>

        </div>

      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">

        {orders.length === 0 ? (
          <div className="rounded-[35px] bg-white p-16 text-center shadow-sm">

            <Package
              size={70}
              className="mx-auto text-sky-500"
            />

            <h2 className="mt-6 text-4xl font-serif text-[#143D60]">
              No Orders Yet
            </h2>

            <p className="mt-4 text-gray-500">
              Your order history will appear here.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-sky-500 px-8 py-4 text-white hover:bg-sky-600"
            >
              Shop Now
            </Link>

          </div>
        ) : (
          <div className="space-y-8">

            {orders.map((order) => (

              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block"
              >

                <div className="rounded-[32px] bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

                  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex items-center gap-6">

                      <div className="rounded-3xl bg-sky-100 p-6">
                        <Package
                          size={34}
                          className="text-sky-600"
                        />
                      </div>

                      <div>

                        <h2 className="text-2xl font-bold text-[#143D60]">
                          Order #{order.id}
                        </h2>

                        <div className="mt-3 flex items-center gap-2 text-gray-500">
                          <Calendar size={16} />

                          {new Date(
                            order.created_at
                          ).toLocaleDateString("en-IN")}
                        </div>

                      </div>

                    </div>

                    <div className="flex flex-wrap items-center gap-8">

                      <div>

                        <p className="text-sm text-gray-500">
                          Total
                        </p>

                        <p className="text-3xl font-bold text-sky-600">
                          ₹{order.total}
                        </p>

                      </div>

                      <div>

                        <p className="mb-2 text-sm text-gray-500">
                          Status
                        </p>

                        <span
                          className={`rounded-full px-5 py-2 font-medium ${statusColor(
                            order.status
                          )}`}
                        >
                          {order.status || "Pending"}
                        </span>

                      </div>

                      <div>

                        <p className="mb-2 text-sm text-gray-500">
                          Payment
                        </p>

                        <div className="flex items-center gap-2">
                          <CreditCard size={18} />
                          {order.payment_status || "Paid"}
                        </div>

                      </div>

                      <div>

                        <p className="mb-2 text-sm text-gray-500">
                          Shipping
                        </p>

                        <div className="flex items-center gap-2">
                          <Truck size={18} />
                          Standard
                        </div>

                      </div>

                      <ChevronRight
                        size={28}
                        className="text-gray-400"
                      />

                    </div>

                  </div>

                </div>

              </Link>

            ))}

          </div>
        )}

      </section>

    </main>
  );
}