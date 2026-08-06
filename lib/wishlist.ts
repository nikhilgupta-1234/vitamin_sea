import { supabase } from "./supabase";
import { Product } from "@/types/product";

async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

// Load Wishlist
export async function loadWishlist(): Promise<Product[]> {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("wishlist")
    .select(
      `
      product:products(*)
    `
    )
    .eq("user_id", user.id);

  if (error) throw error;

  return (
    data?.map((item: any) => item.product) || []
  );
}

// Add Product
export async function addWishlistItem(
  productId: number
) {
  const user = await getCurrentUser();

  if (!user) return;

  await supabase
    .from("wishlist")
    .upsert(
      {
        user_id: user.id,
        product_id: productId,
      },
      {
        onConflict: "user_id,product_id",
      }
    );
}

// Remove Product
export async function removeWishlistItem(
  productId: number
) {
  const user = await getCurrentUser();

  if (!user) return;

  await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);
}

// Clear Wishlist
export async function clearWishlist() {
  const user = await getCurrentUser();

  if (!user) return;

  await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", user.id);
}