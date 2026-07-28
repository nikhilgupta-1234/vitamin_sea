"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Users,
  Mail,
  Calendar,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Customer {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (!error && data) {
      setCustomers(data);
    }

    setLoading(false);
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.full_name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      customer.email
        ?.toLowerCase()
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
          Manage your registered customers
        </p>
      </div>

      {/* Stats Card */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-[35px] bg-white p-8 shadow-sm">
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
              <Users
                size={35}
                className="text-sky-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Customers Table */}
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

        {/* Table */}
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
                  Joined On
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-20 text-center text-gray-500"
                  >
                    Loading customers...
                  </td>
                </tr>
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map(
                  (customer) => (
                    <tr
                      key={customer.id}
                      className="border-b"
                    >
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-100">
                            <Users
                              className="text-sky-600"
                              size={24}
                            />
                          </div>

                          <div>
                            <p className="font-semibold">
                              {customer.full_name}
                            </p>

                            <p className="text-sm text-gray-500">
                              ID #{customer.id}
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
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={18} />

                          {new Date(
                            customer.created_at
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="py-20 text-center text-gray-500"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}