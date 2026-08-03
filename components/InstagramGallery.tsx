"use client";

import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";

const posts = [
  "/instagram/1.jpg",
  "/instagram/2.jpg",
  "/instagram/3.jpg",
  "/instagram/4.jpg",
  "/instagram/5.jpg",
  "/instagram/6.jpg",
];

export default function InstagramGallery() {
  return (
    <section className="bg-[#F8F4EC] py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">

          <h2 className="font-serif text-3xl text-[#143D60] sm:text-4xl lg:text-5xl">
            Follow Our Journey
          </h2>

          <p className="mt-4 text-gray-600 sm:text-lg">
            Discover new arrivals, customer styles and behind-the-scenes
            moments from Vitamin Sea.
          </p>

          <p className="mt-3 font-medium text-sky-600">
            @vitaminsea
          </p>

        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">

          {posts.map((img, index) => (
            <Link
              key={index}
              href="https://instagram.com"
              target="_blank"
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl">

                <Image
                  src={img}
                  alt={`Instagram ${index + 1}`}
                  width={500}
                  height={500}
                  className="h-40 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-56 lg:h-60"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/40">

                  <Camera
                    size={34}
                    className="scale-75 text-white opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100"
                  />

                </div>

              </div>
            </Link>
          ))}

        </div>

        {/* CTA */}
        <div className="mt-12 text-center">

          <Link
            href="https://instagram.com"
            target="_blank"
            className="inline-flex items-center gap-3 rounded-full bg-sky-500 px-8 py-4 font-semibold text-white transition hover:bg-sky-600"
          >
            <Camera size={20} />
            Follow on Instagram
          </Link>

        </div>

      </div>
    </section>
  );
}