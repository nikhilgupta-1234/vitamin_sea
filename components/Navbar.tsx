"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  Package,
  Menu,
  X,
} from "lucide-react";

import AuthButton from "./AuthButton";
import { useAppSelector } from "@/store/hooks";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  const wishlistItems = useAppSelector(
    (state) => state.wishlist.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Shop",
      href: "/shop",
    },
    {
      name: "Collections",
      href: "/collections",
    },
    {
      name: "Orders",
      href: "/orders",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl italic text-sky-600 sm:text-3xl"
          >
            Vitamin Sea
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">

            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-medium text-gray-700 transition hover:text-sky-600"
              >
                {item.name}
              </Link>
            ))}

          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 sm:gap-4">

            <button className="hidden text-gray-700 transition hover:text-sky-600 md:block">
              <Search size={22} />
            </button>

            <Link
              href="/wishlist"
              className="relative text-gray-700 transition hover:text-sky-600"
            >
              <Heart size={22} />

              {wishlistItems.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] text-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              href="/orders"
              className="hidden text-gray-700 transition hover:text-sky-600 sm:block"
            >
              <Package size={22} />
            </Link>

            <div className="hidden sm:block">
              <AuthButton />
            </div>

            <Link
              href="/cart"
              className="relative text-gray-700 transition hover:text-sky-600"
            >
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden"
            >
              <Menu size={28} />
            </button>

          </div>

        </nav>
      </header>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-5">

          <h2 className="font-serif text-2xl italic text-sky-600">
            Vitamin Sea
          </h2>

          <button onClick={() => setOpen(false)}>
            <X size={28} />
          </button>

        </div>

        <div className="flex flex-col p-6">

          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b py-4 text-lg text-gray-700 transition hover:text-sky-600"
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-6">
            <AuthButton />
          </div>

        </div>

      </aside>
    </>
  );
}