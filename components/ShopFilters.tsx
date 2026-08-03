"use client";

import { Search, X } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;

  onClear: () => void;
}

export default function ShopFilters({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  onClear,
}: Props) {
  return (
    <div className="mb-10 rounded-3xl bg-white p-5 shadow-sm sm:p-6">

      {/* Search */}

      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="h-12 w-full rounded-full border border-gray-200 bg-gray-50 pl-12 pr-4 outline-none transition focus:border-sky-500 focus:bg-white"
        />

      </div>

      {/* Filters */}

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex flex-col gap-4 sm:flex-row">

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="h-12 rounded-full border border-gray-200 bg-white px-5 outline-none focus:border-sky-500"
          >
            <option value="All">
              All Categories
            </option>

            <option value="Hair Clips">
              Hair Clips
            </option>

            <option value="Earrings">
              Earrings
            </option>

            <option value="Necklaces">
              Necklaces
            </option>

            <option value="Bracelets">
              Bracelets
            </option>

            <option value="Anklets">
              Anklets
            </option>

          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="h-12 rounded-full border border-gray-200 bg-white px-5 outline-none focus:border-sky-500"
          >
            <option value="">
              Sort By
            </option>

            <option value="newest">
              Newest
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="featured">
              Best Selling
            </option>

          </select>

        </div>

        <button
          onClick={onClear}
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-gray-200 px-6 text-gray-600 transition hover:bg-red-50 hover:text-red-500"
        >
          <X size={18} />
          Clear Filters
        </button>

      </div>

    </div>
  );
}