"use client";

import { useEffect } from "react";

import { supabase } from "@/lib/supabase";

import {
  loadCart as loadDatabaseCart,
  addCartItem,
} from "@/lib/cart";

import {
  loadCart as loadLocalCart,
  saveCart,
  isCartMerged,
  setCartMerged,
} from "@/lib/cartStorage";

import { useAppDispatch } from "@/store/hooks";
import { setCart } from "@/store/cartSlice";

export default function CartInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function initializeCart() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setCartMerged(false);
        dispatch(setCart([]));
        return;
      }

      const localCart = loadLocalCart();

      if (
        localCart.length > 0 &&
        !isCartMerged()
      ) {
        for (const item of localCart) {
          await addCartItem(
            item.id,
            item.quantity
          );
        }

        saveCart([]);
        setCartMerged(true);
      }

      const mergedCart =
        await loadDatabaseCart();

      dispatch(setCart(mergedCart));
    }

    initializeCart();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session) {
          const localCart =
            loadLocalCart();

          if (
            localCart.length > 0 &&
            !isCartMerged()
          ) {
            for (const item of localCart) {
              await addCartItem(
                item.id,
                item.quantity
              );
            }

            saveCart([]);
            setCartMerged(true);
          }

          const mergedCart =
            await loadDatabaseCart();

          dispatch(setCart(mergedCart));
        } else {
          setCartMerged(false);
          dispatch(setCart([]));
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return null;
}