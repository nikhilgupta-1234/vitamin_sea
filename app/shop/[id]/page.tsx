import { notFound } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import AddToCartButton from "@/components/shop/AddToCartButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetails({ params }: Props) {
  const { id } = await params;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(4);

  return (
    <main className="max-w-7xl mx-auto px-6 py-14">

      <div className="grid lg:grid-cols-2 gap-16">

        {/* Image */}
        <div className="rounded-3xl overflow-hidden bg-slate-100">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            width={700}
            height={700}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Details */}
        <div>

          <span className="inline-block rounded-full bg-sky-100 text-sky-700 px-4 py-2 text-sm">
            {product.category}
          </span>

          <h1 className="mt-5 text-5xl font-serif text-[#143D60]">
            {product.name}
          </h1>

          <p className="mt-6 text-gray-600 leading-8">
            {product.description}
          </p>

          <h2 className="mt-8 text-4xl font-bold text-sky-600">
            ₹{product.price}
          </h2>

          <div className="mt-6">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-500 font-medium">
                Out of Stock
              </span>
            )}
          </div>

          <div className="mt-10 flex gap-4">

           <AddToCartButton product={product} />

            <button className="rounded-2xl border px-8 hover:bg-slate-50 transition">
              ❤
            </button>

          </div>

          <div className="mt-12 rounded-2xl bg-slate-50 p-6">
            <h3 className="font-semibold text-lg mb-3">
              Why You'll Love It
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>🌊 Handmade with natural sea shells</li>
              <li>✨ Premium quality materials</li>
              <li>🎁 Perfect for gifting</li>
              <li>🚚 Fast shipping across India</li>
            </ul>
          </div>

        </div>

      </div>

      {/* Related Products */}
      <section className="mt-24">

        <h2 className="text-3xl font-serif text-[#143D60] mb-8">
          You May Also Like
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {relatedProducts?.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border p-5 hover:shadow-lg transition"
            >
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                width={250}
                height={250}
                className="rounded-2xl"
              />

              <h3 className="mt-4 font-semibold">
                {item.name}
              </h3>

              <p className="text-sky-600 font-bold mt-2">
                ₹{item.price}
              </p>
            </div>
          ))}

        </div>

      </section>

    </main>
  );
}