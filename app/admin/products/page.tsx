"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", {
        ascending: false,
      });

    if (!error && data) {
      setProducts(data);
    }
  }

  async function deleteProduct(id: number) {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchProducts();
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      product.category
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <main className="flex-1 bg-[#F8FAFC] p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-5xl text-[#143D60]">
          Products
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your inventory
        </p>
      </div>

      {/* Card */}
      <div className="rounded-[35px] bg-white p-8 shadow-sm">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-[#143D60]">
            Products
          </h2>

          <p className="mt-2 text-gray-500">
            Add, edit and manage products
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
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
                <th className="pb-5">Product</th>
                <th className="pb-5">Category</th>
                <th className="pb-5">Price</th>
                <th className="pb-5">Stock</th>
                <th className="pb-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b"
                >
                  {/* Product */}
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          product.image ||
                          "/placeholder.png"
                        }
                        alt={product.name}
                        width={70}
                        height={70}
                        className="rounded-2xl object-cover"
                      />

                      <div>
                        <p className="font-semibold text-lg">
                          {product.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          #{product.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="text-gray-700">
                    {product.category}
                  </td>

                  {/* Price */}
                  <td className="font-semibold text-sky-600">
                    ₹{product.price}
                  </td>

                  {/* Stock */}
                  <td>
                    <span
                      className={`rounded-full px-5 py-2 text-sm font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-600 transition hover:bg-sky-500 hover:text-white"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}