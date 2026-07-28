import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">

        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold text-[#143D60] transition group-hover:text-sky-600">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-gray-500">
            {product.description}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-2xl font-bold text-sky-600">
              ₹{product.price}
            </span>

            <span className="rounded-xl bg-sky-500 px-4 py-2 text-white transition group-hover:bg-sky-600">
              View
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}