"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { initializeCart } from "@/store/cartSlice";
import { loadCart } from "@/lib/cartStorage";

export default function CartInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cart = loadCart();
    dispatch(initializeCart(cart));
  }, [dispatch]);

  return null;
}