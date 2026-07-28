"use client";

import Image from "next/image";
import { useState } from "react";
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
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-16 lg:grid-cols-2">
        {/* Image */}
        <div className="overflow-hidden rounded-[40px] bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            width={700}
            height={700}
            className="h-[650px] w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="uppercase tracking-[5px] text-sky-500">
            {product.category}
          </p>

          <h1 className="mt-4 font-serif text-6xl text-[#143D60]">
            {product.name}
          </h1>

          <p className="mt-8 text-4xl font-bold text-sky-500">
            ₹{product.price}
          </p>

          <p className="mt-8 text-lg leading-8 text-gray-600">
            {product.description}
          </p>

          <p className="mt-8 text-gray-500">
            Stock Available: {product.stock}
          </p>

          {/* Quantity */}
          <div className="mt-10 flex items-center gap-4">
            <button
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
              className="h-12 w-12 rounded-xl border"
            >
              -
            </button>

            <span className="text-xl font-semibold">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="h-12 w-12 rounded-xl border"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-10 w-fit rounded-2xl bg-sky-500 px-10 py-4 text-white hover:bg-sky-600"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
}