"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function ProductGrid({ products }: Props) {
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
    if (search.trim()) {
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
    switch (sort) {
      case "low":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "high":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "az":
        filtered.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      case "za":
        filtered.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        break;
    }

    return filtered;
  }, [products, search, category, sort]);

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setSort("");
  }

  return (
    <>
      {/* Filters */}
      <section className="mb-10 rounded-3xl bg-white p-4 shadow-lg sm:p-6 lg:mb-14 lg:p-8">
        {/* Search */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-sky-500 focus:bg-white sm:py-4 sm:pl-14 sm:text-base"
          />
        </div>

        {/* Categories */}
        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition sm:px-6 sm:py-3 ${
                category === item
                  ? "bg-sky-500 text-white shadow"
                  : "bg-sky-50 text-gray-700 hover:bg-sky-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Bottom Controls */}
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-sky-500 lg:w-64"
          >
            <option value="">Sort Products</option>
            <option value="low">
              Price: Low to High
            </option>
            <option value="high">
              Price: High to Low
            </option>
            <option value="az">
              Name: A-Z
            </option>
            <option value="za">
              Name: Z-A
            </option>
          </select>

          <button
            onClick={clearFilters}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-5 py-3 text-gray-600 transition hover:bg-red-50 hover:text-red-500 lg:w-auto"
          >
            <X size={18} />
            Clear Filters
          </button>
        </div>
      </section>

      {/* Product Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-gray-500 sm:text-base">
          Showing{" "}
          <span className="font-semibold text-[#143D60]">
            {filteredProducts.length}
          </span>{" "}
          product
          {filteredProducts.length !== 1 && "s"}
        </p>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl bg-white px-6 py-16 text-center shadow">
          <h3 className="text-2xl font-semibold text-[#143D60]">
            No Products Found
          </h3>

          <p className="mt-3 text-gray-500">
            Try changing your search or filters.
          </p>

          <button
            onClick={clearFilters}
            className="mt-6 rounded-full bg-sky-500 px-6 py-3 text-white transition hover:bg-sky-600"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
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