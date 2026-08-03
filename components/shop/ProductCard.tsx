import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group block"
    >
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

        {/* Product Image */}

        <div className="relative overflow-hidden">

          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            width={600}
            height={600}
            sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
            className="h-52 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-64 lg:h-72"
          />

          {/* Featured Badge */}

          {product.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white shadow">
              Bestseller
            </span>
          )}

          {/* Stock Badge */}

          {product.stock !== undefined && (
            <span
              className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${
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

          <h3 className="line-clamp-2 min-h-[52px] text-base font-semibold text-[#143D60] transition group-hover:text-sky-600 sm:text-lg">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-gray-500 sm:text-base">
            {product.description}
          </p>

          <div className="mt-5 flex items-center justify-between">

            <div>
              <p className="text-xl font-bold text-sky-600 sm:text-2xl">
                ₹{Number(product.price).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-medium text-white transition group-hover:bg-sky-600">
              View
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </div>

          </div>

        </div>

      </div>
    </Link>
  );
}