"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Order {
  id: number;
  customer_name: string;
  total: number;
  status: string;
  created_at: string;
}

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchOrders() {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-3xl font-bold">
        Orders
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">
            <th className="py-4 text-left">Customer</th>
            <th className="text-left">Amount</th>
            <th className="text-left">Status</th>
            <th className="text-left">Date</th>
          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-5">
                {order.customer_name}
              </td>

              <td>
                ₹ {order.total}
              </td>

              <td>
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  {order.status}
                </span>
              </td>

              <td>
                {new Date(order.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}