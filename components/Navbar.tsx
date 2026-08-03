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
  const [open, setOpen] =useState(false);

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
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "Orders", href: "/orders" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Header */}
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

          {/* Right Side */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="hidden md:block text-gray-700 hover:text-sky-600 transition">
              <Search size={22} />
            </button>

            <Link
              href="/wishlist"
              className="relative text-gray-700 hover:text-sky-600 transition"
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
              className="hidden sm:block text-gray-700 hover:text-sky-600 transition"
            >
              <Package size={22} />
            </Link>

            {/* Desktop Login */}
            <div className="hidden md:block">
              <AuthButton />
            </div>

            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-sky-600 transition"
            >
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
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
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="font-serif text-3xl italic text-sky-600"
          >
            Vitamin Sea
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={28} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <nav className="space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-4 text-lg font-medium text-gray-700 transition hover:bg-sky-50 hover:text-sky-600"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Login/Signup */}
          <AuthButton
            mobile
            onNavigate={() => setOpen(false)}
          />
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-5 text-center text-sm text-gray-500">
          🌊 Vitamin Sea
        </div>
      </aside>
    </>
  );
}