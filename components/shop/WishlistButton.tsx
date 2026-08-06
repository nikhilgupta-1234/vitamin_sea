"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { Product } from "@/types/product";
import { supabase } from "@/lib/supabase";

import {
  addWishlistItem,
  removeWishlistItem,
} from "@/lib/wishlist";

import {
  loadWishlist,
  saveWishlist,
} from "@/lib/wishlistStorage";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import {
  toggleWishlist,
} from "@/store/wishlistSlice";

interface Props {
  product: Product;
}

export default function WishlistButton({
  product,
}: Props) {
  const dispatch = useAppDispatch();

  const isWishlisted = useAppSelector((state) =>
    state.wishlist.items.some(
      (item) => item.id === product.id
    )
  );

  const [loading, setLoading] =
    useState(false);

  async function handleWishlist(
    e: React.MouseEvent
  ) {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        if (isWishlisted) {
          await removeWishlistItem(product.id);
        } else {
          await addWishlistItem(product.id);
        }
      } else {
        const wishlist =
          loadWishlist();

        const exists =
          wishlist.find(
            (item) =>
              item.id === product.id
          );

        if (exists) {
          saveWishlist(
            wishlist.filter(
              (item) =>
                item.id !== product.id
            )
          );
        } else {
          saveWishlist([
            ...wishlist,
            product,
          ]);
        }
      }

      dispatch(toggleWishlist(product));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleWishlist}
      disabled={loading}
      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110 disabled:opacity-50 sm:h-11 sm:w-11"
    >
      <Heart
        size={18}
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
  );
}