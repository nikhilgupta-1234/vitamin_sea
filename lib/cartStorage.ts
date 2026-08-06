import { Product } from "@/types/product";

export interface StoredCartItem extends Product {
  quantity: number;
}

const STORAGE_KEY = "vitamin-sea-cart";

export function loadCart(): StoredCartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart: StoredCartItem[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}
const MERGED_KEY = "vitamin-sea-cart-merged";

export function isCartMerged() {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(MERGED_KEY) === "true";
}

export function setCartMerged(value: boolean) {
  if (typeof window === "undefined") return;

  if (value) {
    localStorage.setItem(MERGED_KEY, "true");
  } else {
    localStorage.removeItem(MERGED_KEY);
  }
}