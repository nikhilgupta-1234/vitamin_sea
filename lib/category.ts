import { supabase } from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) throw error;

  return data;
}

export async function addCategory(name: string) {
  const { error } = await supabase
    .from("categories")
    .insert([{ name }]);

  if (error) throw error;
}

export async function deleteCategory(id: number) {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id);

  if (error) throw error;
}