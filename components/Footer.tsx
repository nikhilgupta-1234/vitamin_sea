import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";


export default function Footer() {
  return (
    <footer className="bg-[#143D60] text-white">

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>

            <h2 className="font-serif text-3xl italic text-sky-400">
              Vitamin Sea
            </h2>

            <p className="mt-5 leading-7 text-gray-300">
              Handmade ocean-inspired accessories designed to bring
              elegance, beauty and a little bit of the beach into
              everyday life.
            </p>

            <div className="mt-6 flex gap-4">

              <Link
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-sky-500"
              >
                <FaInstagram size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-sky-500"
              >
                <FaFacebookF size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-sky-500"
              >
                <FaXTwitter size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-sky-500"
              >
                <FaYoutube size={18} />
              </Link>

            </div>

          </div>

          {/* Shop */}
          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Shop
            </h3>

            <div className="space-y-3 text-gray-300">

              <Link
                href="/shop"
                className="block transition hover:text-sky-400"
              >
                All Products
              </Link>

              <Link
                href="/collections"
                className="block transition hover:text-sky-400"
              >
                Collections
              </Link>

              <Link
                href="/wishlist"
                className="block transition hover:text-sky-400"
              >
                Wishlist
              </Link>

              <Link
                href="/cart"
                className="block transition hover:text-sky-400"
              >
                Shopping Cart
              </Link>

            </div>

          </div>

          {/* Company */}
          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Company
            </h3>

            <div className="space-y-3 text-gray-300">

              <Link
                href="/about"
                className="block transition hover:text-sky-400"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="block transition hover:text-sky-400"
              >
                Contact
              </Link>

              <Link
                href="/orders"
                className="block transition hover:text-sky-400"
              >
                Track Order
              </Link>

              <Link
                href="/faq"
                className="block transition hover:text-sky-400"
              >
                FAQ
              </Link>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Contact
            </h3>

            <div className="space-y-4 text-gray-300">

              <div className="flex items-start gap-3">

                <Mail
                  size={18}
                  className="mt-1 text-sky-400"
                />

                <span>
                  support@vitaminsea.com
                </span>

              </div>

              <div className="flex items-start gap-3">

                <Phone
                  size={18}
                  className="mt-1 text-sky-400"
                />

                <span>
                  +91 98765 43210
                </span>

              </div>

              <div className="flex items-start gap-3">

                <MapPin
                  size={18}
                  className="mt-1 text-sky-400"
                />

                <span>
                  Jamshedpur, Jharkhand, India
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Trust Banner */}

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-sm text-gray-300">

          Secure Payments • Fast Delivery • Premium Handmade Quality •
          Trusted by Customers Across India

        </div>

        {/* Bottom */}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-gray-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} Vitamin Sea. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">

            <Link
              href="/privacy-policy"
              className="hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-white"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/refund-policy"
              className="hover:text-white"
            >
              Refund Policy
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}