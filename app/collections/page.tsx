import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    name: "Hair Clips",
    image: "/collections/hair-clips.jpg",
  },
  {
    name: "Earrings",
    image: "/collections/earrings.jpg",
  },
  {
    name: "Necklaces",
    image: "/collections/necklaces.jpg",
  },
  {
    name: "Bracelets",
    image: "/collections/bracelets.jpg",
  },
  {
    name: "Anklets",
    image: "/collections/anklets.jpg",
  },
  {
    name: "Gift Sets",
    image: "/collections/gift-sets.jpg",
  },
];

export default function CollectionsPage() {
  return (
    <main className="bg-[#fafafa]">
      {/* Hero */}
      <section className="py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-4 uppercase tracking-[6px] text-sky-500">
            Vitamin Sea
          </p>

          <h1 className="font-serif text-6xl text-[#143D60]">
            Our Collections
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Discover ocean-inspired accessories handcrafted with love and
            designed to bring beach elegance to your everyday style.
          </p>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <Link
          href="/shop?category=Necklaces"
          className="group relative block overflow-hidden rounded-[40px]"
        >
          <div className="relative h-[550px]">
            <Image
              src="/collections/necklaces.jpg"
              alt="Necklaces"
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10" />

            <div className="absolute left-12 top-1/2 -translate-y-1/2 text-white">
              <p className="mb-4 uppercase tracking-[5px]">
                Featured Collection
              </p>

              <h2 className="font-serif text-6xl">
                Pearl Necklaces
              </h2>

              <button className="mt-8 rounded-full bg-white px-8 py-4 text-black transition hover:scale-105">
                Explore Collection
              </button>
            </div>
          </div>
        </Link>
      </section>

      {/* Collection Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          {collections.map((collection) => (
            <Link
              key={collection.name}
              href={`/shop?category=${collection.name}`}
              className="group relative overflow-hidden rounded-[32px]"
            >
              <div className="relative h-[420px]">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="font-serif text-4xl">
                    {collection.name}
                  </h3>

                  <p className="mt-2 text-sm uppercase tracking-[4px] opacity-90">
                    Shop Now →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sky-50 py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="font-serif text-5xl text-[#143D60]">
            Crafted By The Ocean
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Every piece at Vitamin Sea is handmade with love, inspired by
            beaches, pearls and the beauty of the sea.
          </p>

          <Link
            href="/shop"
            className="mt-10 inline-block rounded-full bg-sky-500 px-10 py-4 text-white transition hover:bg-sky-600"
          >
            Shop All Products
          </Link>
        </div>
      </section>
    </main>
  );
}