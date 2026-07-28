"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function ProductGrid({
  products,
}: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category)),
  ];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search
    if (search) {
      filtered = filtered.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    // Category
    if (category !== "All") {
      filtered = filtered.filter(
        (product) => product.category === category
      );
    }

    // Sort
    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, search, category, sort]);

  return (
    <>
      {/* Premium Filter Section */}
      <div className="mb-14 rounded-[32px] bg-white p-8 shadow-xl">
        {/* Search */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search your perfect accessory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-14 pr-5 outline-none transition focus:border-sky-500 focus:bg-white"
          />
        </div>

        {/* Category Pills */}
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-6 py-3 text-sm font-medium transition ${
                category === item
                  ? "bg-sky-500 text-white shadow-lg"
                  : "bg-sky-50 text-gray-700 hover:bg-sky-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-2xl border border-gray-200 bg-white px-5 py-3 outline-none focus:border-sky-500"
          >
            <option value="">Sort Products</option>
            <option value="low">
              Price: Low to High
            </option>
            <option value="high">
              Price: High to Low
            </option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSort("");
            }}
            className="flex items-center gap-2 rounded-2xl border border-gray-200 px-6 py-3 text-gray-600 transition hover:bg-red-50 hover:text-red-500"
          >
            <X size={18} />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Product Count */}
      <p className="mb-8 text-gray-500">
        {filteredProducts.length} Products Found
      </p>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl bg-white p-20 text-center shadow">
          <h3 className="text-2xl font-semibold text-[#143D60]">
            No Products Found
          </h3>

          <p className="mt-3 text-gray-500">
            Try changing your filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </>
  );
}