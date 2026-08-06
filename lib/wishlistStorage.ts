import { Product } from "@/types/product";

const STORAGE_KEY = "vitamin-sea-wishlist";
const MERGED_KEY = "vitamin-sea-wishlist-merged";

// Load Wishlist
export function loadWishlist(): Product[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Save Wishlist
export function saveWishlist(
  wishlist: Product[]
) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(wishlist)
  );
}

// Clear Wishlist
export function clearWishlistStorage() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}

// Has wishlist already been merged?
export function isWishlistMerged() {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    localStorage.getItem(MERGED_KEY) === "true"
  );
}

// Mark wishlist as merged
export function setWishlistMerged(
  merged: boolean
) {
  if (typeof window === "undefined") {
    return;
  }

  if (merged) {
    localStorage.setItem(
      MERGED_KEY,
      "true"
    );
  } else {
    localStorage.removeItem(
      MERGED_KEY
    );
  }
}