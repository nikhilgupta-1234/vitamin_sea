"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const items = useAppSelector(
    (state) => state.wishlist.items
  );

  return (
    <main className="min-h-screen bg-sky-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="mb-12 font-serif text-5xl text-[#143D60]">
          My Wishlist
        </h1>

        {items.length === 0 ? (
          <div className="rounded-3xl bg-white p-20 text-center shadow">
            <Heart
              size={70}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-6 text-3xl font-semibold text-[#143D60]">
              Your wishlist is empty
            </h2>

            <p className="mt-4 text-gray-500">
              Save your favourite sea treasures here.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-sky-500 px-8 py-4 text-white hover:bg-sky-600"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-8 text-gray-500">
              {items.length} saved products
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}