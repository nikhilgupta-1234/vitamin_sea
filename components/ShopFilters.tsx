"use client";

import { Search } from "lucide-react";

export default function ShopFilters() {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-between mb-10">

      <div className="relative w-full lg:w-96">
        <Search className="absolute left-4 top-4 text-gray-400" size={18} />

        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-full border pl-11 pr-4 py-3 bg-white outline-none"
        />
      </div>

      <div className="flex gap-4">

        <select className="rounded-full border px-5 py-3 bg-white">
          <option>All Categories</option>
          <option>Hair Clips</option>
          <option>Earrings</option>
          <option>Necklaces</option>
          <option>Bracelets</option>
          <option>Anklets</option>
        </select>

        <select className="rounded-full border px-5 py-3 bg-white">
          <option>Sort By</option>
          <option>Newest</option>
          <option>Price Low to High</option>
          <option>Price High to Low</option>
          <option>Best Selling</option>
        </select>

      </div>

    </div>
  );
}