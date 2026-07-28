import { supabase } from "./supabase";

export async function getReviews(productId: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}
export async function addReview(
  productId: number,
  rating: number,
  review: string
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login to submit a review.");
  }

  const { data: profile } = await supabase
    .from("customers")
    .select("full_name")
    .eq("email", user.email)
    .single();

  const customerName =
    profile?.full_name ||
    user.user_metadata?.full_name ||
    user.email!;

  const { error } = await supabase
    .from("reviews")
    .insert({
      product_id: productId,
      user_id: user.id,
      customer_name: customerName,
      rating,
      review, // ✅ correct column name
    });

  if (error) throw error;
}