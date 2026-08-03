"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

export default function BestSeller() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .order("created_at", {
          ascending: false,
        })
        .limit(8);

      if (error) throw error;

      setProducts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">

          <div>
            <h2 className="font-serif text-3xl text-[#143D60] sm:text-4xl lg:text-5xl">
              Best Sellers
            </h2>

            <p className="mt-2 text-gray-500">
              Our most loved handmade sea accessories.
            </p>
          </div>

          <Link
            href="/shop"
            className="rounded-full border border-sky-500 px-6 py-3 font-medium text-sky-600 transition hover:bg-sky-500 hover:text-white"
          >
            View All
          </Link>

        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            No featured products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}