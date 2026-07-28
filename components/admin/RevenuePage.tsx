"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { IndianRupee } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Order {
  id: number;
  total: number;
  created_at: string;
}

export default function RevenuePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchRevenue();
  }, []);

  async function fetchRevenue() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at");

    if (!data) return;

    setOrders(data);

    const total = data.reduce(
      (sum, order) =>
        sum + Number(order.total),
      0
    );

    setRevenue(total);
  }

  const chartData = orders.map((order) => ({
    date: new Date(
      order.created_at
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    revenue: order.total,
  }));

  return (
    <main className="flex-1 bg-[#F8FAFC] p-8">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-[#143D60]">
          Revenue Analytics
        </h1>

        <p className="mt-2 text-gray-500">
          Sales and revenue insights
        </p>
      </div>

      {/* Revenue Card */}
      <div className="mb-10 rounded-[35px] bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">
              Total Revenue
            </p>

            <h2 className="mt-4 text-6xl font-bold text-[#143D60]">
              ₹{revenue}
            </h2>
          </div>

          <div className="rounded-3xl bg-sky-100 p-6">
            <IndianRupee
              size={40}
              className="text-sky-600"
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-[35px] bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-[#143D60]">
          Revenue Trend
        </h2>

        <p className="mt-2 text-gray-500">
          Revenue generated from orders
        </p>

        <div className="mt-10 h-[450px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="revenue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#0ea5e9"
                    stopOpacity={0.5}
                  />

                  <stop
                    offset="95%"
                    stopColor="#0ea5e9"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0ea5e9"
                fill="url(#revenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}