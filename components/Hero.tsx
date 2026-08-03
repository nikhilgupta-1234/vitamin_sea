"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex min-h-[75vh] items-center sm:min-h-[85vh] lg:min-h-screen">
      {/* Background */}
      <Image
        src="/hero.jpg"
        alt="Vitamin Sea"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10"
      >
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Vitamin Sea
          </h1>

          <p className="mt-4 text-lg text-sky-100 sm:text-xl md:text-2xl lg:text-3xl">
            A daily dose of beachy glam
          </p>

          <div className="mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-600 sm:px-8 sm:py-4 sm:text-lg"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}