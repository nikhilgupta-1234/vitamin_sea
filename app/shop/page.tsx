import { supabase } from "@/lib/supabase";
import ProductGrid from "@/components/ProductGrid";

export default async function ShopPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main className="bg-sky-50 min-h-screen">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="mb-12 text-center font-serif text-6xl text-[#143D60]">
          Shop
        </h1>

        <ProductGrid
          products={products || []}
        />
      </section>
    </main>
  );
}