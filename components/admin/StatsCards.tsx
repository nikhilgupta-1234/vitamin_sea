"use client";

import {
  Package,
  ShoppingBag,
  IndianRupee,
  Users,
} from "lucide-react";

interface Props {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  totalCustomers: number;
}

export default function StatsCards({
  totalProducts,
  totalOrders,
  totalRevenue,
  totalCustomers,
}: Props) {
  const cards = [
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
      color: "bg-sky-500",
    },
    {
      title: "Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "bg-emerald-500",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-amber-500",
    },
    {
      title: "Customers",
      value: totalCustomers,
      icon: Users,
      color: "bg-violet-500",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl bg-white p-6 shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} rounded-2xl p-4 text-white`}
              >
                <Icon size={28} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}