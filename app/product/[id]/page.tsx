import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { supabase } from "@/lib/supabase";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import ProductReviews from "@/components/product/ProductReviews";
import ReviewForm from "@/components/product/ReviewForm";
import RelatedProducts from "@/components/product/RelatedProducts";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", Number(id))
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F4EC]">

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">

        {/* Breadcrumb */}

        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">

          <Link
            href="/"
            className="hover:text-sky-600"
          >
            Home
          </Link>

          <ChevronRight size={16} />

          <Link
            href="/shop"
            className="hover:text-sky-600"
          >
            Shop
          </Link>

          <ChevronRight size={16} />

          <span className="font-medium text-[#143D60]">
            {product.name}
          </span>

        </nav>

        {/* Product */}

        <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          <ProductGallery image={product.image} />

          <ProductInfo product={product} />

        </section>

        {/* Tabs */}

        <section className="mt-12 lg:mt-16">
          <ProductTabs
            description={product.description}
          />
        </section>

        {/* Reviews */}

        <section className="mt-12 lg:mt-16">
          <ProductReviews
            productId={product.id}
          />
        </section>

        {/* Review Form */}

        <section className="mt-10 lg:mt-14">
          <ReviewForm
            productId={product.id}
          />
        </section>

        {/* Related Products */}

        <section className="mt-14 lg:mt-20">
          <RelatedProducts
            category={product.category}
            currentId={product.id}
          />
        </section>

      </div>

    </main>
  );
}