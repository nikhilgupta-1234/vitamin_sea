"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";

import { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";

interface Props {
  product: Product;
}

export default function AddToCartButton({
  product,
}: Props) {
  const dispatch = useAppDispatch();

  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    dispatch(addToCart(product));

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  }

  const outOfStock = Number(product.stock) <= 0;

  return (
    <button
      onClick={handleAddToCart}
      disabled={outOfStock}
      className="flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-3 text-base font-semibold text-white transition duration-300 hover:bg-sky-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-400 sm:py-4 sm:text-lg"
    >
      {added ? (
        <>
          <Check size={20} />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingBag size={20} />
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </>
      )}
    </button>
  );
}