"use client";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
} from "lucide-react";

import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="bg-[#F8F4EC]">

      {/* Hero */}

      <section className="relative h-[500px] overflow-hidden">

        <Image
          src="/contact/contact-hero.jpg"
          alt="Contact"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-center justify-center">

          <div className="px-6 text-center text-white">

            <p className="mb-4 uppercase tracking-[8px] text-sky-300">
              Vitamin Sea
            </p>

            <h1 className="font-serif text-5xl md:text-7xl">
              We'd Love To Hear
              <br />
              From You
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-200">
              Questions, collaborations or support —
              we're always happy to help.
            </p>

          </div>

        </div>

      </section>

      {/* Contact */}

      <section className="mx-auto max-w-7xl px-6 py-24">

        <div className="grid gap-12 lg:grid-cols-2">

          {/* Left */}

          <div className="rounded-[40px] bg-[#143D60] p-12 text-white shadow-xl">

            <h2 className="font-serif text-4xl">
              Let's Connect
            </h2>

            <p className="mt-6 text-sky-100 leading-8">
              Whether you have a question about our handmade
              accessories, shipping or your order,
              our team is always here for you.
            </p>

            <div className="mt-12 space-y-8">

              <div className="flex gap-5">
                <Mail className="mt-1 text-sky-300" />

                <div>
                  <p className="text-sky-300 text-sm">
                    Email
                  </p>

                  <p className="text-lg">
                    support@vitaminsea.com
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <Phone className="mt-1 text-sky-300" />

                <div>
                  <p className="text-sky-300 text-sm">
                    Phone
                  </p>

                  <p className="text-lg">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <MapPin className="mt-1 text-sky-300" />

                <div>
                  <p className="text-sky-300 text-sm">
                    Address
                  </p>

                  <p className="text-lg">
                    Jamshedpur,
                    Jharkhand,
                    India
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <MessageCircle className="mt-1 text-sky-300" />

                <div>
                  <p className="text-sky-300 text-sm">
                    Instagram
                  </p>

                  <p className="text-lg">
                    @vitaminsea
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <Clock className="mt-1 text-sky-300" />

                <div>
                  <p className="text-sky-300 text-sm">
                    Working Hours
                  </p>

                  <p className="text-lg">
                    Mon – Sat
                  </p>

                  <p className="text-sky-100">
                    10:00 AM – 7:00 PM
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Form */}

          <div className="rounded-[40px] bg-white p-12 shadow-xl">

            <h2 className="font-serif text-4xl text-[#143D60]">
              Send A Message
            </h2>

            <p className="mt-4 text-gray-500">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form className="mt-10 space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl border p-4 outline-none transition focus:border-sky-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border p-4 outline-none transition focus:border-sky-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-2xl border p-4 outline-none transition focus:border-sky-500"
              />

              <textarea
                rows={6}
                placeholder="Write your message..."
                className="w-full rounded-2xl border p-4 outline-none transition focus:border-sky-500"
              />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 py-4 text-lg font-semibold text-white transition hover:bg-sky-600"
              >
                <Send size={20} />
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      {/* Map */}

      <section className="mx-auto max-w-7xl px-6 pb-24">

        <div className="overflow-hidden rounded-[40px] shadow-lg">

          <iframe
            src="https://www.google.com/maps?q=Jamshedpur,India&output=embed"
            className="h-[450px] w-full"
            loading="lazy"
          />

        </div>

      </section>

      {/* CTA */}

      <section className="bg-[#143D60] py-24">

        <div className="mx-auto max-w-4xl px-6 text-center text-white">

          <h2 className="font-serif text-5xl">
            Thank You For Visiting
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-sky-100">
            We appreciate every customer and every message.
            Thank you for supporting our handmade ocean-inspired creations.
          </p>

        </div>

      </section>

    </main>
  );
}