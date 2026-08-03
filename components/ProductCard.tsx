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

  const inStock = Number(product.stock) > 0;

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <Link href={`/product/${product.id}`}>

        {/* Image */}
        <div className="relative overflow-hidden">

          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            width={600}
            height={600}
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-64 lg:h-72"
          />

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(toggleWishlist(product));
            }}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 sm:h-11 sm:w-11"
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

          {/* Category */}
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#143D60] backdrop-blur">
            {product.category}
          </span>

          {/* Featured */}
          {product.featured && (
            <span className="absolute bottom-3 left-3 rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">
              Bestseller
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">

          {/* Rating */}
          <div className="mb-3 flex items-center gap-1 text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={15}
                fill="currentColor"
              />
            ))}

            <span className="ml-2 text-xs text-gray-500">
              (5.0)
            </span>
          </div>

          {/* Name */}
          <h3 className="line-clamp-2 text-base font-semibold text-[#143D60] transition group-hover:text-sky-600 sm:text-lg">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-4 flex items-center justify-between">

            <div>
              <p className="text-2xl font-bold text-sky-600">
                ₹{product.price}
              </p>

              <p
                className={`mt-1 text-sm font-medium ${
                  inStock
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {inStock
                  ? `${product.stock} in stock`
                  : "Out of stock"}
              </p>
            </div>

          </div>

          {/* Button */}
          <button
            disabled={!inStock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              if (inStock) {
                dispatch(addToCart(product));
              }
            }}
            className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3 font-medium transition active:scale-95 ${
              inStock
                ? "bg-sky-500 text-white hover:bg-sky-600"
                : "cursor-not-allowed bg-gray-300 text-gray-600"
            }`}
          >
            <ShoppingBag size={18} />

            {inStock
              ? "Add to Cart"
              : "Out of Stock"}
          </button>

        </div>

      </Link>
    </div>
  );
}