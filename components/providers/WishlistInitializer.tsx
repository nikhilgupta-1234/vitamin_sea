"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/store/hooks";
import { initializeWishlist } from "@/store/wishlistSlice";

import {
  loadWishlist,
} from "@/lib/wishlistStorage";

export default function WishlistInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const wishlist = loadWishlist();

    dispatch(
      initializeWishlist(wishlist)
    );
  }, [dispatch]);

  return null;
}