"use client";

import { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";

interface Props {
  product: Product;
}

export default function AddToCartButton({ product }: Props) {
  const dispatch = useAppDispatch();

  function handleAddToCart() {
    dispatch(addToCart(product));
    alert("Product added to cart!");
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 rounded-2xl bg-sky-500 py-4 text-lg font-semibold text-white transition hover:bg-sky-600"
    >
      Add to Cart
    </button>
  );
}