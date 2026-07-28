"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FolderTree,
  ChevronRight,
  BarChart3,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
  name: "Analytics",
  href: "/admin/analytics",
  icon: BarChart3,
},
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r bg-white shadow-lg">
      {/* Logo */}
      <div className="border-b p-8">
        <h1 className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-3xl font-serif italic text-transparent">
          Vitamin Sea
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Admin Dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3 overflow-y-auto p-5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            pathname.startsWith(
              item.href + "/"
            );

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-300 ${
                active
                  ? "bg-sky-500 text-white shadow-lg"
                  : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    active
                      ? "bg-white/20"
                      : "bg-sky-50 group-hover:bg-white"
                  }`}
                >
                  <Icon size={20} />
                </div>

                <span className="font-medium">
                  {item.name}
                </span>
              </div>

              <ChevronRight
                size={18}
                className={`transition ${
                  active
                    ? "translate-x-1"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t p-6">
        <div className="rounded-2xl bg-sky-50 p-4">
          <p className="text-sm font-semibold text-[#143D60]">
            Vitamin Sea Admin
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Manage products, orders and customers.
          </p>
        </div>
      </div>
    </aside>
  );
}