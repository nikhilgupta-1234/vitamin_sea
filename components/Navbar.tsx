"use client";

import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingCart,
  Package,
} from "lucide-react";

import AuthButton from "./AuthButton";
import { useAppSelector } from "@/store/hooks";

export default function Navbar() {
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

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-serif italic text-sky-600"
        >
          Vitamin Sea
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 font-medium text-gray-700 md:flex">
          <Link
            href="/"
            className="transition hover:text-sky-600"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="transition hover:text-sky-600"
          >
            Shop
          </Link>

          <Link
            href="/collections"
            className="transition hover:text-sky-600"
          >
            Collections
          </Link>

          <Link
            href="/orders"
            className="transition hover:text-sky-600"
          >
            Orders
          </Link>

          <Link
            href="/about"
            className="transition hover:text-sky-600"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="transition hover:text-sky-600"
          >
            Contact
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button className="text-gray-700 transition hover:text-sky-600">
            <Search size={22} />
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative text-gray-700 transition hover:text-sky-600"
          >
            <Heart size={22} />

            {wishlistItems.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-xs text-white">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          {/* Orders */}
          <Link
            href="/orders"
            className="text-gray-700 transition hover:text-sky-600"
          >
            <Package size={22} />
          </Link>

          {/* Auth */}
          <AuthButton />

          {/* Cart */}
          <Link
            href="/cart"
            className="relative text-gray-700 transition hover:text-sky-600"
          >
            <ShoppingCart size={22} />

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-xs text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}