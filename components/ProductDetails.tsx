"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

import { Product } from "@/types/product";
import { addToCart } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";

interface Props {
  product: Product;
}

export default function ProductDetails({
  product,
}: Props) {
  const dispatch = useAppDispatch();

  const [quantity, setQuantity] = useState(1);

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    alert("Added to cart!");
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* IMAGE */}

        <div className="overflow-hidden rounded-[30px] bg-gray-100 shadow-lg">

          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            width={800}
            height={800}
            priority
            className="h-[350px] w-full object-cover transition duration-500 hover:scale-105 sm:h-[500px] lg:h-[650px]"
          />

        </div>

        {/* PRODUCT INFO */}

        <div className="lg:sticky lg:top-28 lg:self-start">

          <span className="inline-block rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700">
            {product.category}
          </span>

          <h1 className="mt-5 font-serif text-3xl text-[#143D60] sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>

          <p className="mt-6 text-3xl font-bold text-sky-600 sm:text-4xl">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </p>

          <p className="mt-8 text-base leading-8 text-gray-600 sm:text-lg">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-2">

            <CheckCircle
              size={20}
              className={
                Number(product.stock) > 0
                  ? "text-green-500"
                  : "text-red-500"
              }
            />

            <span
              className={`font-medium ${
                Number(product.stock) > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {Number(product.stock) > 0
                ? `${product.stock} Items in Stock`
                : "Out of Stock"}
            </span>

          </div>

          {/* Quantity */}

          <div className="mt-10 flex items-center gap-5">

            <span className="font-semibold">
              Quantity
            </span>

            <div className="flex items-center rounded-full border">

              <button
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100"
              >
                <Minus size={18} />
              </button>

              <span className="w-14 text-center text-lg font-semibold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((q) => q + 1)
                }
                className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>

            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={handleAddToCart}
            disabled={Number(product.stock) === 0}
            className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 py-4 text-lg font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            <ShoppingBag size={22} />
            Add To Cart
          </button>

          {/* Features */}

          <div className="mt-10 space-y-5 rounded-3xl bg-sky-50 p-6">

            <div className="flex items-center gap-4">

              <Truck className="text-sky-600" />

              <div>

                <p className="font-semibold">
                  Free Shipping
                </p>

                <p className="text-sm text-gray-500">
                  On orders above ₹999
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <ShieldCheck className="text-sky-600" />

              <div>

                <p className="font-semibold">
                  Secure Checkout
                </p>

                <p className="text-sm text-gray-500">
                  Razorpay protected payment
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}