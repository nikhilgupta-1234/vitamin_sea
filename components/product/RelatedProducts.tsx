"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "../shop/ProductCard";

interface Props {
  category: string;
  currentId: number;
}

export default function RelatedProducts({
  category,
  currentId,
}: Props) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category, currentId]);

  async function fetchProducts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .neq("id", currentId)
      .limit(4);

    if (error) {
      console.error(error);
      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  if (!loading && products.length === 0) {
    return null;
  }

  return (
    <section className="mt-14 sm:mt-16 lg:mt-24">

      {/* Heading */}
      <div className="mb-8 flex flex-col items-center text-center lg:mb-12">

        <p className="text-sm font-semibold uppercase tracking-[4px] text-sky-500">
          Recommended
        </p>

        <h2 className="mt-2 font-serif text-3xl text-[#143D60] sm:text-4xl lg:text-5xl">
          You May Also Like
        </h2>

        <p className="mt-3 max-w-2xl text-gray-500">
          Discover more handcrafted ocean-inspired accessories you'll love.
        </p>

      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse overflow-hidden rounded-3xl bg-white shadow"
            >
              <div className="h-56 bg-gray-200" />
              <div className="space-y-3 p-5">
                <div className="h-5 rounded bg-gray-200" />
                <div className="h-4 w-2/3 rounded bg-gray-200" />
                <div className="h-8 w-1/2 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}

    </section>
  );
}