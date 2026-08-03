import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { supabase } from "@/lib/supabase";
import ProductGrid from "@/components/ProductGrid";

export default async function ShopPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main className="min-h-screen bg-[#F8F4EC]">

      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-100 via-white to-sky-50">

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">

          {/* Breadcrumb */}

          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">

            <Link
              href="/"
              className="hover:text-sky-600"
            >
              Home
            </Link>

            <ChevronRight size={16} />

            <span className="font-medium text-[#143D60]">
              Shop
            </span>

          </nav>

          <div className="max-w-3xl">

            <p className="font-semibold uppercase tracking-[4px] text-sky-500">
              Vitamin Sea Collection
            </p>

            <h1 className="mt-4 font-serif text-4xl text-[#143D60] sm:text-5xl lg:text-6xl">
              Discover Beach-Inspired Accessories
            </h1>

            <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
              Explore our handcrafted collection of shell
              jewellery, pearl accessories, hair clips,
              bracelets and elegant coastal fashion.
            </p>

          </div>

        </div>

      </section>

      {/* Products */}

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">

        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="font-serif text-3xl text-[#143D60]">
              All Products
            </h2>

            <p className="mt-2 text-gray-500">
              {products?.length ?? 0} Products Available
            </p>

          </div>

        </div>

        <ProductGrid products={products || []} />

      </section>

    </main>
  );
}