import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    name: "Hair Clips",
    image: "/collections/hair-clips.jpg",
    products: "25+ Products",
  },
  {
    name: "Earrings",
    image: "/collections/earrings.jpg",
    products: "40+ Products",
  },
  {
    name: "Necklaces",
    image: "/collections/necklaces.jpg",
    products: "32+ Products",
  },
  {
    name: "Bracelets",
    image: "/collections/bracelets.jpg",
    products: "18+ Products",
  },
  {
    name: "Anklets",
    image: "/collections/anklets.jpg",
    products: "14+ Products",
  },
  {
    name: "Gift Sets",
    image: "/collections/gift-sets.jpg",
    products: "12+ Products",
  },
];

export default function CollectionsPage() {
  return (
    <main className="bg-[#F8F4EC]">

      {/* Hero */}

      <section className="relative h-[650px] overflow-hidden">

        <Image
          src="/collections/hero.jpg"
          alt="Collections"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="px-6 text-center text-white">

            <p className="mb-4 uppercase tracking-[8px] text-sky-300">
              Vitamin Sea
            </p>

            <h1 className="font-serif text-5xl md:text-7xl">
              Ocean Inspired
              <br />
              Collections
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-200">
              Handmade accessories inspired by beaches,
              pearls and the timeless beauty of the sea.
            </p>

            <Link
              href="/shop"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-sky-500 px-8 py-4 font-semibold transition hover:bg-sky-600"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

      {/* Featured */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <Link
          href="/shop?category=Necklaces"
          className="group block overflow-hidden rounded-[40px]"
        >

          <div className="relative h-[550px]">

            <Image
              src="/collections/necklaces.jpg"
              alt="Necklaces"
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#143D60]/80 to-transparent" />

            <div className="absolute left-14 top-1/2 max-w-lg -translate-y-1/2 text-white">

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
                Featured Collection
              </span>

              <h2 className="mt-6 font-serif text-6xl">
                Pearl Necklaces
              </h2>

              <p className="mt-6 leading-8 text-gray-200">
                Elegant handmade pearl necklaces designed
                to bring effortless coastal luxury to every outfit.
              </p>

              <div className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-[#143D60] transition group-hover:scale-105">
                Explore Collection
                <ArrowRight size={18} />
              </div>

            </div>

          </div>

        </Link>

      </section>

      {/* Collections */}

      <section className="mx-auto max-w-7xl px-6 pb-28">

        <div className="mb-16 text-center">

          <h2 className="font-serif text-5xl text-[#143D60]">
            Shop By Collection
          </h2>

          <p className="mt-5 text-gray-600">
            Find your perfect beach-inspired accessory.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {collections.map((collection) => (

            <Link
              key={collection.name}
              href={`/shop?category=${collection.name}`}
              className="group"
            >

              <div className="overflow-hidden rounded-[35px] bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">

                <div className="relative h-[360px] overflow-hidden">

                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute bottom-8 left-8 text-white">

                    <h3 className="font-serif text-4xl">
                      {collection.name}
                    </h3>

                    <p className="mt-2 text-sm tracking-wide text-sky-200">
                      {collection.products}
                    </p>

                  </div>

                </div>

                <div className="flex items-center justify-between px-8 py-6">

                  <span className="font-semibold text-[#143D60]">
                    View Collection
                  </span>

                  <ArrowRight
                    className="transition group-hover:translate-x-2"
                    size={20}
                  />

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="bg-[#143D60] py-24">

        <div className="mx-auto max-w-4xl px-6 text-center text-white">

          <h2 className="font-serif text-5xl">
            Bring The Ocean Home
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-sky-100">
            Discover handcrafted seashell jewelry made with love,
            inspired by nature and designed to last.
          </p>

          <Link
            href="/shop"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-sky-500 px-10 py-4 font-semibold transition hover:bg-sky-600"
          >
            Shop All Products
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </main>
  );
}