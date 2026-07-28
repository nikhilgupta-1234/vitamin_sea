"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Package,
  Calendar,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Order {
  id: number;
  customer_name: string;
  total: number;
  tracking_status: string;
  created_at: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (data) {
      setOrders(data);
    }
  }

  async function updateStatus(
    id: number,
    status: string
  ) {
    await supabase
      .from("orders")
      .update({
        tracking_status: status,
      })
      .eq("id", id);

    fetchOrders();
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.customer_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      order.id
        .toString()
        .includes(search)
  );

  return (
    <main className="flex-1 bg-[#F8FAFC] p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-serif text-[#143D60]">
          Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Manage customer orders
        </p>
      </div>

      {/* Card */}
      <div className="rounded-[35px] bg-white p-8 shadow-sm">
        {/* Top Bar */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-4xl font-bold text-[#143D60]">
              Orders
            </h2>

            <p className="mt-2 text-gray-500">
              Track and manage customer purchases
            </p>
          </div>

          <div className="relative w-full md:w-[380px]">
            <Search
              size={20}
              className="absolute left-5 top-4 text-gray-400"
            />

            <input
              placeholder="Search orders..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-2xl border py-4 pl-14 pr-4 outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-5 font-semibold">
                  Order
                </th>

                <th className="pb-5 font-semibold">
                  Customer
                </th>

                <th className="pb-5 font-semibold">
                  Status
                </th>

                <th className="pb-5 font-semibold">
                  Total
                </th>

                <th className="pb-5 font-semibold">
                  Date
                </th>

                <th className="pb-5 font-semibold">
                  Update
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b"
                >
                  <td className="py-6">
                    <Link
                      href={`/orders/${order.id}`}
                      className="flex items-center gap-4"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
                        <Package
                          size={24}
                          className="text-sky-600"
                        />
                      </div>

                      <div>
                        <p className="font-semibold">
                          Order #{order.id}
                        </p>

                        <p className="text-sm text-gray-500">
                          View details
                        </p>
                      </div>

                      <ChevronRight
                        size={18}
                        className="text-gray-400"
                      />
                    </Link>
                  </td>

                  <td>
                    {order.customer_name ||
                      "Customer"}
                  </td>

                  <td>
                    <span className="rounded-full bg-sky-100 px-4 py-2 text-sm text-sky-700">
                      {order.tracking_status}
                    </span>
                  </td>

                  <td className="font-semibold text-sky-600">
                    ₹{order.total}
                  </td>

                  <td>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar size={16} />
                      {new Date(
                        order.created_at
                      ).toLocaleDateString()}
                    </div>
                  </td>

                  <td>
                    <select
                      value={
                        order.tracking_status
                      }
                      onChange={(e) =>
                        updateStatus(
                          order.id,
                          e.target.value
                        )
                      }
                      className="rounded-xl border px-4 py-3 outline-none focus:border-sky-500"
                    >
                      <option>
                        Order Placed
                      </option>
                      <option>
                        Confirmed
                      </option>
                      <option>
                        Shipped
                      </option>
                      <option>
                        Out for Delivery
                      </option>
                      <option>
                        Delivered
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="py-20 text-center text-gray-500">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}