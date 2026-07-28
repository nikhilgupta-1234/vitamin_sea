"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Customer {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
}

export default function CustomersTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCustomers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setCustomers(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-lg">
        Loading Customers...
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-3xl font-bold">
        Customers
      </h2>

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th className="py-4 text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Joined</th>
          </tr>
        </thead>

        <tbody>

          {customers.map((customer) => (

            <tr
              key={customer.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-5">
                {customer.full_name}
              </td>

              <td>
                {customer.email}
              </td>

              <td>
                {new Date(customer.created_at).toLocaleDateString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}