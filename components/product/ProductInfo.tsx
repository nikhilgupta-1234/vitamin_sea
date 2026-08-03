"use client";

import { useState } from "react";
import {
  Heart,
  ShoppingBag,
  Star,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";

import QuantitySelector from "./QuantitySelector";

interface Props {
  product: any;
}

export default function ProductInfo({
  product,
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);

  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some(
      (item) => item.id === product.id
    )
  );

  const addItem = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="lg:sticky lg:top-24 h-fit">

      {/* Rating */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex text-yellow-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              fill="currentColor"
            />
          ))}
        </div>

        <span className="text-sm text-gray-500">
          (128 Reviews)
        </span>
      </div>

      {/* Product Name */}
      <h1 className="font-serif text-3xl text-[#143D60] sm:text-4xl lg:text-5xl">
        {product.name}
      </h1>

      {/* Price */}
      <p className="mt-4 text-3xl font-bold text-sky-600 sm:text-4xl">
        ₹{product.price}
      </p>

      {/* Description */}
      <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
        {product.description}
      </p>

      {/* Quantity */}
      <div className="mt-8">
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">

        <button
          onClick={() =>
            dispatch(toggleWishlist(product))
          }
          className="flex h-14 w-full items-center justify-center rounded-2xl border transition hover:bg-red-50 sm:w-14"
        >
          <Heart
            fill={
              isWishlisted
                ? "currentColor"
                : "none"
            }
            className={
              isWishlisted
                ? "text-red-500"
                : "text-gray-500"
            }
          />
        </button>

        <button
          onClick={addItem}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-sky-500 py-4 font-semibold text-white transition hover:bg-sky-600 active:scale-[0.98]"
        >
          <ShoppingBag size={20} />
          Add to Cart
        </button>

      </div>

      {/* Buy Now */}
      <button
        onClick={() => {
          addItem();
          router.push("/checkout");
        }}
        className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#143D60] py-4 font-semibold text-white transition hover:bg-[#0c2f4d] active:scale-[0.98]"
      >
        <Zap size={20} />
        Buy Now
      </button>

      {/* Product Info */}
      <div className="mt-10 rounded-3xl border bg-white p-5 shadow-sm sm:p-6">

        <div className="flex items-center justify-between border-b py-4">
          <span className="text-gray-600">
            Availability
          </span>

          <span
            className={`font-semibold ${
              Number(product.stock) > 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {Number(product.stock) > 0
              ? "In Stock"
              : "Out of Stock"}
          </span>
        </div>

        <div className="flex items-center justify-between border-b py-4">
          <span className="text-gray-600">
            Category
          </span>

          <span className="font-medium text-[#143D60]">
            {product.category}
          </span>
        </div>

        <div className="flex items-center justify-between py-4">
          <span className="text-gray-600">
            Shipping
          </span>

          <span className="font-medium text-green-600">
            Free Delivery
          </span>
        </div>

      </div>

    </div>
  );
}