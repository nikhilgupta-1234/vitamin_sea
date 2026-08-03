"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Hair Clips",
    image: "/categories/1.jpg",
    slug: "hair-clips",
  },
  {
    name: "Earrings",
    image: "/categories/2.jpg",
    slug: "earrings",
  },
  {
    name: "Necklaces",
    image: "/categories/3.jpg",
    slug: "necklaces",
  },
  {
    name: "Bracelets",
    image: "/categories/4.jpg",
    slug: "bracelets",
  },
  {
    name: "Anklets",
    image: "/categories/5.jpg",
    slug: "anklets",
  },
  {
    name: "Gift Sets",
    image: "/categories/gift.jpg",
    slug: "gift-sets",
  },
];

export default function CategorySection() {
  return (
    <section className="bg-[#F8F4EC] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center font-serif text-3xl text-[#143D60] sm:text-4xl lg:mb-14 lg:text-5xl">
          Shop by Collection
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((item) => (
            <Link
              key={item.name}
              href={`/shop?category=${item.slug}`}
              className="group text-center"
            >
              <div className="mx-auto aspect-square w-28 overflow-hidden rounded-full shadow-lg transition duration-300 group-hover:shadow-xl sm:w-36 lg:w-40">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-700 transition group-hover:text-sky-600 sm:text-base lg:text-lg">
                {item.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}