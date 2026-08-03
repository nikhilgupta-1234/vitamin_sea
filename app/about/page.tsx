import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Gem,
  HeartHandshake,
  Waves,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-[#F8F4EC]">

      {/* Hero */}
      <section className="relative h-[420px] sm:h-[520px] lg:h-[650px] overflow-hidden">

        <Image
          src="/about/about-hero.jpg"
          alt="About Vitamin Sea"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-white">

            <nav className="mb-8 flex items-center gap-2 text-sm text-white/80">
              <Link href="/">Home</Link>
              <ChevronRight size={16} />
              <span>About</span>
            </nav>

            <p className="uppercase tracking-[5px] text-sky-300">
              Our Story
            </p>

            <h1 className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl">
              About Vitamin Sea
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-200 sm:text-lg">
              Inspired by the ocean, handcrafted with passion,
              and designed to bring beach elegance into everyday life.
            </p>

          </div>
        </div>

      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div>

            <p className="uppercase tracking-[4px] text-sky-500 font-semibold">
              Our Journey
            </p>

            <h2 className="mt-4 font-serif text-3xl text-[#143D60] sm:text-5xl">
              Bringing The Ocean To Your Style
            </h2>

            <div className="mt-8 space-y-6 text-gray-600 leading-8">

              <p>
                Vitamin Sea was created from a deep love for beaches,
                seashells, pearls and timeless handmade jewellery.
              </p>

              <p>
                Every accessory is carefully designed to reflect the
                calmness, beauty and elegance of the ocean while adding
                a unique touch to your everyday outfit.
              </p>

              <p>
                Our goal is to make every customer feel like they're
                carrying a small piece of the sea wherever they go.
              </p>

            </div>

          </div>

          <div className="relative h-[350px] overflow-hidden rounded-[36px] shadow-xl sm:h-[500px]">

            <Image
              src="/about/story.jpg"
              alt="Our Story"
              fill
              className="object-cover"
            />

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="bg-white py-16">

        <div className="mx-auto grid max-w-6xl gap-8 px-6 text-center sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <h3 className="text-5xl font-bold text-sky-500">
              1000+
            </h3>
            <p className="mt-3 text-gray-600">
              Happy Customers
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-sky-500">
              100%
            </h3>
            <p className="mt-3 text-gray-600">
              Handmade
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-sky-500">
              50+
            </h3>
            <p className="mt-3 text-gray-600">
              Designs
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-sky-500">
              5★
            </h3>
            <p className="mt-3 text-gray-600">
              Customer Rating
            </p>
          </div>

        </div>

      </section>

      {/* Values */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-center font-serif text-3xl text-[#143D60] sm:text-5xl">
            What Makes Us Special
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: Gem,
                title: "Handmade",
                text: "Every product is carefully handcrafted with love."
              },
              {
                icon: Waves,
                title: "Ocean Inspired",
                text: "Designed using shells, pearls and beach aesthetics."
              },
              {
                icon: HeartHandshake,
                title: "Premium Quality",
                text: "Made with durable materials for long-lasting beauty."
              },
              {
                icon: Users,
                title: "Customer First",
                text: "We focus on quality, service and customer happiness."
              },
            ].map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="rounded-3xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100">

                    <Icon
                      size={30}
                      className="text-sky-500"
                    />

                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-[#143D60]">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {item.text}
                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-20">

        <div className="mx-auto max-w-4xl rounded-[36px] bg-gradient-to-r from-sky-500 to-sky-600 px-8 py-14 text-center text-white shadow-xl">

          <h2 className="font-serif text-3xl sm:text-5xl">
            Carry A Piece Of The Ocean
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sky-100 leading-8">
            Explore our handcrafted collection and discover timeless
            accessories inspired by the beauty of the sea.
          </p>

          <Link
            href="/shop"
            className="mt-10 inline-block rounded-full bg-white px-10 py-4 font-semibold text-sky-600 transition hover:scale-105"
          >
            Shop Collection
          </Link>

        </div>

      </section>

    </main>
  );
}