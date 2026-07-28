import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: Props) {
  if (products.length === 0) return null;

  return (
    <section className="bg-sky-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-14 text-center font-serif text-5xl text-[#143D60]">
          You May Also Like
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-72">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-[#143D60]">
                  {product.name}
                </h3>

                <p className="mt-3 text-xl font-bold text-sky-600">
                  ₹{product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}