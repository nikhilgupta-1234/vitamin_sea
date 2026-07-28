"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import ProductReviews from "@/components/product/ProductReviews";
import ReviewForm from "@/components/product/ReviewForm";

export default function ProductPage() {
  const params = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  async function fetchProduct() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", Number(params.id))
      .single();

    if (error) {
      console.error(error);
    }

    if (data) {
      setProduct(data);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
          <p className="text-lg text-gray-600">
            Loading Product...
          </p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="mb-3 text-4xl font-bold text-[#143D60]">
            Product Not Found
          </h1>

          <p className="text-gray-500">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Product Section */}
        <div className="grid gap-16 lg:grid-cols-2">
          <ProductGallery
            image={product.image}
          />

          <ProductInfo
            product={product}
          />
        </div>

        {/* Description */}
        <ProductTabs
          description={product.description}
        />

        {/* Customer Reviews */}
        <ProductReviews
          productId={product.id}
        />

        {/* Write Review */}
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