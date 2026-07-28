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

  const [quantity, setQuantity] =
    useState(1);

  const isWishlisted = useAppSelector(
    (state) =>
      state.wishlist.items.some(
        (item) => item.id === product.id
      )
  );

  const addItem = () => {
    for (
      let i = 0;
      i < quantity;
      i++
    ) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="sticky top-24 h-fit">

      <div className="mb-4 flex items-center gap-1 text-yellow-400">
        {[1,2,3,4,5].map((star)=>(
          <Star
            key={star}
            size={18}
            fill="currentColor"
          />
        ))}

        <span className="ml-2 text-gray-500">
          (128 Reviews)
        </span>
      </div>

      <h1 className="text-5xl font-serif text-[#143D60]">
        {product.name}
      </h1>

      <p className="mt-6 text-4xl font-bold text-sky-600">
        ₹{product.price}
      </p>

      <p className="mt-8 leading-8 text-gray-600">
        {product.description}
      </p>

      <div className="mt-10">
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </div>

      <div className="mt-10 flex gap-4">

        <button
          onClick={() =>
            dispatch(toggleWishlist(product))
          }
          className="flex h-14 w-14 items-center justify-center rounded-2xl border hover:bg-red-50"
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
          className="flex-1 rounded-2xl bg-sky-500 py-4 font-semibold text-white transition hover:bg-sky-600"
        >
          <div className="flex items-center justify-center gap-2">
            <ShoppingBag size={20}/>
            Add to Cart
          </div>
        </button>

      </div>

      <button
        onClick={()=>{
          addItem();
          router.push("/checkout");
        }}
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#143D60] py-4 text-white transition hover:bg-[#0c2f4d]"
      >
        <Zap size={20}/>
        Buy Now
      </button>

      <div className="mt-12 rounded-3xl bg-white p-6 shadow-sm">

        <div className="flex justify-between border-b py-4">
          <span>Availability</span>
          <span className="font-semibold text-green-600">
            In Stock
          </span>
        </div>

        <div className="flex justify-between border-b py-4">
          <span>Category</span>
          <span>{product.category}</span>
        </div>

        <div className="flex justify-between py-4">
          <span>Shipping</span>
          <span>Free</span>
        </div>

      </div>

    </div>
  );
}