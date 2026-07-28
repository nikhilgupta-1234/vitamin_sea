import { supabase } from "./supabase";

export async function updateProduct(
  id: number,
  product: {
    name: string;
    description: string;
    category: string;
    price: string;
    stock: string;
    featured: boolean;
    image?: string;
  }
) {
  const { error } = await supabase
    .from("products")
    .update({
      name: product.name,
      description: product.description,
      category: product.category,
      price: Number(product.price),
      stock: Number(product.stock),
      featured: product.featured,
      image: product.image,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }
}