"use client";

import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-gradient-to-r from-sky-500 to-cyan-500 py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-[32px] border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md sm:p-10 lg:p-14">

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Mail className="text-white" size={32} />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl text-white sm:text-4xl lg:text-5xl">
            Join Vitamin Sea
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-sky-100 sm:text-lg">
            Be the first to discover new arrivals, exclusive offers,
            seasonal collections and handcrafted coastal accessories.
          </p>

          {/* Form */}
          <form className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email address"
              className="h-14 flex-1 rounded-full border border-white/20 bg-white px-6 text-gray-700 outline-none transition focus:border-white focus:ring-4 focus:ring-white/20"
            />

            <button
              type="submit"
              className="h-14 rounded-full bg-[#143D60] px-8 font-semibold text-white transition hover:scale-105 hover:bg-[#0f3150]"
            >
              Subscribe
            </button>

          </form>

          {/* Bottom Text */}
          <p className="mt-6 text-sm text-sky-100">
            No spam. Unsubscribe anytime.
          </p>

        </div>

      </div>
    </section>
  );
}