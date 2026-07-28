"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center">

      <img
        src="/hero.jpg"
        alt="Vitamin Sea"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-8"
      >

        <h1 className="text-7xl text-white font-serif mb-4">
          Vitamin Sea
        </h1>

        <p className="text-3xl text-sky-100 mb-8">
          A daily dose of beachy glam
        </p>

        <button className="bg-sky-500 hover:bg-sky-600 transition px-8 py-4 rounded-full text-white text-lg font-semibold">
          Shop Collection
        </button>

      </motion.div>

    </section>
  );
}