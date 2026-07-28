import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative h-[600px] overflow-hidden">
        <Image
          src="/about/about-hero.jpg"
          alt="Vitamin Sea"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="mb-4 uppercase tracking-[6px]">
              Our Story
            </p>

            <h1 className="font-serif text-6xl md:text-7xl">
              About Vitamin Sea
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
              Inspired by the beauty of the ocean and handcrafted with love.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-4 uppercase tracking-[5px] text-sky-500">
              Our Journey
            </p>

            <h2 className="font-serif text-5xl text-[#143D60]">
              Bringing The Ocean To Your Style
            </h2>

            <p className="mt-8 text-lg leading-8 text-gray-600">
              Vitamin Sea was born from a love for beaches, seashells and
              timeless handmade accessories.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Every piece is carefully crafted to capture the beauty of the
              ocean and transform it into elegant jewellery you can wear every
              day.
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our mission is simple — create accessories that make you feel
              connected to the sea, no matter where you are.
            </p>
          </div>

          <div className="relative h-[500px] overflow-hidden rounded-[40px]">
            <Image
              src="/about/story.jpg"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sky-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center font-serif text-5xl text-[#143D60]">
            What Makes Us Special
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-10 shadow-sm">
              <h3 className="text-2xl font-semibold text-[#143D60]">
                Handmade
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Every accessory is carefully handcrafted with love and
                attention to detail.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-10 shadow-sm">
              <h3 className="text-2xl font-semibold text-[#143D60]">
                Ocean Inspired
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Inspired by seashells, pearls and the natural beauty of the
                ocean.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-10 shadow-sm">
              <h3 className="text-2xl font-semibold text-[#143D60]">
                Premium Quality
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Beautiful accessories designed to last and make every day feel
                like a beach vacation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-5xl text-[#143D60]">
            Carry A Piece Of The Ocean With You
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Explore our handcrafted collections and discover your perfect
            beach-inspired accessory.
          </p>

          <Link
            href="/shop"
            className="mt-10 inline-block rounded-full bg-sky-500 px-10 py-4 text-lg text-white transition hover:bg-sky-600"
          >
            Shop Collection
          </Link>
        </div>
      </section>
    </main>
  );
}