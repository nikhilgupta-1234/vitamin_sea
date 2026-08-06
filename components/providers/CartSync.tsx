"use client";

import { useEffect } from "react";

import { useAppSelector } from "@/store/hooks";

import {
  saveCart,
  isCartMerged,
} from "@/lib/cartStorage";

import {
  getCurrentUser,
  loadCart as loadDatabaseCart,
  addCartItem,
  updateCartQuantity,
  removeCartItem,
} from "@/lib/cart";

export default function CartSync() {
  const cartItems = useAppSelector(
    (state) => state.cart.items
  );

  useEffect(() => {
    async function syncCart() {
      // Wait until guest cart has been merged
      if (!isCartMerged()) return;

      const user = await getCurrentUser();

      // Guest user
      if (!user) {
        saveCart(cartItems);
        return;
      }

      try {
        const databaseCart =
          await loadDatabaseCart();

        // Add / Update
        for (const item of cartItems) {
          const existing = databaseCart.find(
            (dbItem) => dbItem.id === item.id
          );

          if (!existing) {
            await addCartItem(
              item.id,
              item.quantity
            );
          } else if (
            existing.quantity !== item.quantity
          ) {
            await updateCartQuantity(
              item.id,
              item.quantity
            );
          }
        }

        // Remove deleted items
        for (const dbItem of databaseCart) {
          const exists = cartItems.find(
            (item) => item.id === dbItem.id
          );

          if (!exists) {
            await removeCartItem(dbItem.id);
          }
        }
      } catch (error) {
        console.error(
          "Cart Sync Error:",
          error
        );
      }
    }

    syncCart();
  }, [cartItems]);

  return null;
}