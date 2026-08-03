import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: Props) {
  if (products.length === 0) return null;

  return (
    <section className="bg-sky-50 py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-10 text-center sm:mb-14">

          <h2 className="font-serif text-3xl text-[#143D60] sm:text-4xl lg:text-5xl">
            You May Also Like
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Discover more handcrafted coastal accessories you'll love.
          </p>

        </div>

        {/* Products */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">

          {products.map((product) => (

            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Image */}

              <div className="relative overflow-hidden">

                <Image
                  src={product.image || "/placeholder.png"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="h-44 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-60 lg:h-72"
                />

                {product.stock !== undefined && (
                  <span
                    className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                      Number(product.stock) > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {Number(product.stock) > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                )}

              </div>

              {/* Content */}

              <div className="p-4 sm:p-5">

                <h3 className="line-clamp-2 min-h-[48px] text-sm font-semibold text-[#143D60] transition group-hover:text-sky-600 sm:text-lg">
                  {product.name}
                </h3>

                <p className="mt-3 text-lg font-bold text-sky-600 sm:text-2xl">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    View Details
                  </span>

                  <div className="rounded-full bg-sky-500 p-2 text-white transition group-hover:bg-sky-600">
                    <ArrowRight size={16} />
                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>
    </section>
  );
}