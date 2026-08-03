import { notFound } from "next/navigation";
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

export default async function ProductDetails({
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
    <main className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Product */}
        <div className="grid gap-16 lg:grid-cols-2">
          <ProductGallery image={product.image} />

          <ProductInfo product={product} />
        </div>

        {/* Description / Shipping / Care */}
        <ProductTabs
          description={product.description}
        />

        {/* Reviews */}
        <ProductReviews
          productId={product.id}
        />

        {/* Review Form */}
        <ReviewForm
          productId={product.id}
        />

        {/* Related Products */}
        <RelatedProducts
          category={product.category}
          currentId={product.id}
        />
      </div>
    </main>
  );
}