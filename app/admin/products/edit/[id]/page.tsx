"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", Number(params.id))
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    if (data) {
      setForm({
        name: data.name || "",
        description: data.description || "",
        category: data.category || "",
        price: String(data.price || ""),
        stock: String(data.stock || ""),
      });
    }

    setLoading(false);
  }

  async function updateProduct() {
    const { error } = await supabase
      .from("products")
      .update({
        name: form.name,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
      })
      .eq("id", Number(params.id));

    if (error) {
      alert(error.message);
      return;
    }

    alert("Product updated successfully");

    router.push("/admin/products");
    router.refresh();
  }

  if (loading) {
    return (
      <div className="p-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl rounded-[35px] bg-white p-10 shadow-sm">
        <h1 className="mb-10 font-serif text-5xl text-[#143D60]">
          Edit Product
        </h1>

        <div className="space-y-6">
          <input
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            placeholder="Product Name"
            className="w-full rounded-2xl border p-4 outline-none focus:border-sky-500"
          />

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            placeholder="Description"
            className="h-40 w-full rounded-2xl border p-4 outline-none focus:border-sky-500"
          />

          <input
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            placeholder="Category"
            className="w-full rounded-2xl border p-4 outline-none focus:border-sky-500"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
              placeholder="Price"
              className="rounded-2xl border p-4 outline-none focus:border-sky-500"
            />

            <input
              type="number"
              value={form.stock}
              onChange={(e) =>
                setForm({
                  ...form,
                  stock: e.target.value,
                })
              }
              placeholder="Stock"
              className="rounded-2xl border p-4 outline-none focus:border-sky-500"
            />
          </div>

          <button
            onClick={updateProduct}
            className="mt-6 w-full rounded-2xl bg-sky-500 py-4 text-lg font-medium text-white transition hover:bg-sky-600"
          >
            Update Product
          </button>
        </div>
      </div>
    </main>
  );
}