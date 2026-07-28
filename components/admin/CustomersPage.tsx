"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Users,
  ShoppingBag,
  Mail,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  spent: number;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    const { data, error } = await supabase
      .from("orders")
      .select("*");

    if (error || !data) return;

    const map = new Map();

    data.forEach((order: any) => {
      const email =
        order.email || "guest@gmail.com";

      const name =
        order.customer_name ||
        order.name ||
        "Guest Customer";

      if (!map.has(email)) {
        map.set(email, {
          id: order.id,
          name,
          email,
          orders: 1,
          spent: Number(order.total),
        });
      } else {
        const customer = map.get(email);

        customer.orders += 1;
        customer.spent += Number(order.total);
      }
    });

    setCustomers(Array.from(map.values()));
  }

  const filteredCustomers =
    customers.filter(
      (customer) =>
        customer.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(search.toLowerCase())
    );

  return (
    <main className="flex-1 bg-[#F8FAFC] p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-5xl text-[#143D60]">
          Customers
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your customers
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-[30px] bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">
                Total Customers
              </p>

              <h2 className="mt-3 text-5xl font-bold text-[#143D60]">
                {customers.length}
              </h2>
            </div>

            <div className="rounded-3xl bg-sky-100 p-5">
              <Users className="text-sky-600" />
            </div>
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-7 shadow-sm">
          <div>
            <p className="text-gray-500">
              Total Orders
            </p>

            <h2 className="mt-3 text-5xl font-bold text-[#143D60]">
              {customers.reduce(
                (a, b) => a + b.orders,
                0
              )}
            </h2>
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-7 shadow-sm">
          <div>
            <p className="text-gray-500">
              Revenue
            </p>

            <h2 className="mt-3 text-5xl font-bold text-[#143D60]">
              ₹
              {customers.reduce(
                (a, b) => a + b.spent,
                0
              )}
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[35px] bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-[#143D60]">
            Customer List
          </h2>

          <p className="mt-2 text-gray-500">
            All registered customers
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={20}
            className="absolute left-5 top-4 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-2xl border py-4 pl-14 pr-4 outline-none focus:border-sky-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-5">
                  Customer
                </th>
                <th className="pb-5">
                  Email
                </th>
                <th className="pb-5">
                  Orders
                </th>
                <th className="pb-5">
                  Total Spent
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map(
                (customer) => (
                  <tr
                    key={customer.email}
                    className="border-b"
                  >
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-100">
                          <Users className="text-sky-600" />
                        </div>

                        <div>
                          <p className="font-semibold">
                            {customer.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={18} />
                        {customer.email}
                      </div>
                    </td>

                    <td>
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={18} />
                        {customer.orders}
                      </div>
                    </td>

                    <td className="font-semibold text-sky-600">
                      ₹{customer.spent}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {filteredCustomers.length ===
            0 && (
            <div className="py-20 text-center text-gray-500">
              No customers found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}