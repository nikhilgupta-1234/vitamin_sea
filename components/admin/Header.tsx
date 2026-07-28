"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b">
      <div className="flex items-center justify-between px-8 py-5">

        {/* Left */}

        <div>
          <h1 className="text-3xl font-serif text-[#143D60]">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome back to Vitamin Sea Admin
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              placeholder="Search..."
              className="w-72 rounded-full border bg-gray-50 pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-sky-400"
            />

          </div>

          <button className="relative rounded-full p-3 hover:bg-gray-100">

            <Bell size={22} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

          </button>

          <div className="flex items-center gap-3">

            <UserCircle
              size={42}
              className="text-sky-500"
            />

            <div>

              <h4 className="font-semibold">
                Admin
              </h4>

              <p className="text-sm text-gray-500">
                administrator
              </p>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
}