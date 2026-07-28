"use client";

import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

const products: Product[] = [
  {
    id: 1,
    name: "Shell Hair Clip",
    description: "Beautiful handmade shell hair clip.",
    category: "Hair Clips",
    price: 499,
    stock: 20,
    featured: true,
    image: "/products/1.jpg",
  },
  {
    id: 2,
    name: "Pearl Necklace",
    description: "Elegant pearl necklace.",
    category: "Necklaces",
    price: 999,
    stock: 15,
    featured: true,
    image: "/products/2.jpg",
  },
  {
    id: 3,
    name: "Ocean Earrings",
    description: "Ocean-inspired earrings.",
    category: "Earrings",
    price: 699,
    stock: 18,
    featured: true,
    image: "/products/3.jpg",
  },
  {
    id: 4,
    name: "Beach Bracelet",
    description: "Beach-style bracelet.",
    category: "Bracelets",
    price: 599,
    stock: 25,
    featured: true,
    image: "/products/4.jpg",
  },
];

export default function BestSeller() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center font-serif text-4xl text-[#143D60]">
          Best Sellers
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}