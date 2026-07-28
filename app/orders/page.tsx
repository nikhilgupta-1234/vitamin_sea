"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Calendar, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
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

    if (data) {
      setOrders(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-lg">
          Loading your orders...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-3 font-serif text-5xl text-[#143D60]">
          My Orders
        </h1>

        <p className="mb-12 text-gray-500">
          Track and manage all your purchases.
        </p>

        {orders.length === 0 ? (
          <div className="rounded-[40px] bg-white p-16 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-sky-100">
              <Package
                size={42}
                className="text-sky-600"
              />
            </div>

            <h2 className="text-3xl font-bold text-[#143D60]">
              No Orders Yet
            </h2>

            <p className="mt-4 text-gray-500">
              Looks like you haven't placed any
              orders yet.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-sky-500 px-8 py-4 text-white transition hover:bg-sky-600"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="group"
              >
                <div className="rounded-[35px] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left */}
                    <div className="flex items-center gap-6">
                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-sky-100">
                        <Package
                          className="text-sky-600"
                          size={34}
                        />
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-[#143D60]">
                          Order #{order.id}
                        </h2>

                        <div className="mt-2 flex items-center gap-2 text-gray-500">
                          <Calendar size={16} />
                          {new Date(
                            order.created_at
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-10">
                      <div>
                        <p className="text-sm text-gray-500">
                          Total
                        </p>

                        <p className="text-3xl font-bold text-sky-600">
                          ₹{order.total}
                        </p>
                      </div>

                      <div>
                        <span className="rounded-full bg-yellow-100 px-5 py-2 font-medium text-yellow-700">
                          {order.status || "Pending"}
                        </span>
                      </div>

                      <ChevronRight
                        className="text-gray-400 transition group-hover:translate-x-2"
                        size={28}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}