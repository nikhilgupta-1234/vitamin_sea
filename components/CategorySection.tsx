"use client";

import Image from "next/image";

const categories = [
  {
    name: "Hair Clips",
    image: "/categories/1.jpg",
  },
  {
    name: "Earrings",
    image: "/categories/2.jpg",
  },
  {
    name: "Necklaces",
    image: "/categories/3.jpg",
  },
  {
    name: "Bracelets",
    image: "/categories/4.jpg",
  },
  {
    name: "Anklets",
    image: "/categories/5.jpg",
  },
  {
    name: "Gift Sets",
    image: "/categories/gift.jpg",
  },
];

export default function CategorySection() {
  return (
    <section className="py-20 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-serif text-center text-[#143D60] mb-12">
          Shop by Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">

          {categories.map((item) => (
            <div
              key={item.name}
              className="group cursor-pointer text-center"
            >
              <div className="overflow-hidden rounded-full w-40 h-40 mx-auto shadow-lg">

                <Image
                  src={item.image}
                  alt={item.name}
                  width={180}
                  height={180}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

              </div>

              <h3 className="mt-5 text-lg font-semibold text-gray-700">
                {item.name}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}