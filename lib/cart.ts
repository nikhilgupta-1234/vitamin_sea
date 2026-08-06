import { supabase } from "./supabase";

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

// Load Cart
export async function loadCart() {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("cart")
    .select(`
      quantity,
      product:products(*)
    `)
    .eq("user_id", user.id);

  if (error) throw error;

  return (
    data?.map((item: any) => ({
      ...item.product,
      quantity: item.quantity,
    })) || []
  );
}

// Add Product
export async function addCartItem(
  productId: number,
  quantity = 1
) {
  const user = await getCurrentUser();

  if (!user) return;

  const { data } = await supabase
    .from("cart")
    .select("quantity")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  if (data) {
    await supabase
      .from("cart")
      .update({
        quantity: data.quantity + quantity,
      })
      .eq("user_id", user.id)
      .eq("product_id", productId);
  } else {
    await supabase
      .from("cart")
      .insert({
        user_id: user.id,
        product_id: productId,
        quantity,
      });
  }
}

// Update Quantity
export async function updateCartQuantity(
  productId: number,
  quantity: number
) {
  const user = await getCurrentUser();

  if (!user) return;

  if (quantity <= 0) {
    return removeCartItem(productId);
  }

  await supabase
    .from("cart")
    .update({ quantity })
    .eq("user_id", user.id)
    .eq("product_id", productId);
}

// Remove Product
export async function removeCartItem(
  productId: number
) {
  const user = await getCurrentUser();

  if (!user) return;

  await supabase
    .from("cart")
    .delete()
    .eq("user_id", user.id)
    .eq("product_id", productId);
}

// Clear Cart
export async function clearDatabaseCart() {
  const user = await getCurrentUser();

  if (!user) return;

  await supabase
    .from("cart")
    .delete()
    .eq("user_id", user.id);
}