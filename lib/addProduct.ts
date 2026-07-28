import { supabase } from "./supabase";
import { uploadImage } from "./uploadImage";

export async function addProduct(
  product: any,
  image: File
) {
  const imageUrl = await uploadImage(image);

  const { error } = await supabase
    .from("products")
    .insert([
      {
        ...product,
        image: imageUrl,
      },
    ]);

  if (error) throw error;
}