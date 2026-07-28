"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";

import { Product } from "@/types/product";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  const dispatch = useAppDispatch();

  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some(
      (item) => item.id === product.id
    )
  );

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      <Link href={`/product/${product.id}`}>

        {/* Image */}
        <div className="relative overflow-hidden">

          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            width={500}
            height={500}
            priority={false}
            className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(toggleWishlist(product));
            }}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
          >
            <Heart
              size={18}
              fill={isWishlisted ? "currentColor" : "none"}
              className={
                isWishlisted
                  ? "text-red-500"
                  : "text-gray-500"
              }
            />
          </button>

          {/* Stock Badge */}
          {"stock" in product && (
            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                Number(product.stock) > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {Number(product.stock) > 0
                ? "In Stock"
                : "Out of Stock"}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">

          <div className="mb-3 flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                fill="currentColor"
              />
            ))}
          </div>

          <h3 className="line-clamp-2 text-lg font-semibold text-[#143D60] transition group-hover:text-sky-600">
            {product.name}
          </h3>

          <p className="mt-3 text-2xl font-bold text-sky-600">
            ₹{product.price}
          </p>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(addToCart(product));
            }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 py-3 font-medium text-white transition hover:bg-sky-600 active:scale-[0.98]"
          >
            <ShoppingBag size={18} />
            Add to Cart
          </button>

        </div>

      </Link>

    </div>
  );
}