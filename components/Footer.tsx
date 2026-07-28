import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#143D60] text-white py-16">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-3xl font-serif italic text-sky-400 mb-4">
            Vitamin Sea
          </h2>

          <p className="text-gray-300">
            A daily dose of beachy glam.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Shop
          </h3>

          <div className="space-y-2">
            <Link href="/shop">All Products</Link><br />
            <Link href="/collections">Collections</Link><br />
            <Link href="/gift">Gift Sets</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Company
          </h3>

          <div className="space-y-2">
            <Link href="/about">About</Link><br />
            <Link href="/contact">Contact</Link><br />
            <Link href="/faq">FAQ</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">
            Contact
          </h3>

          <p>support@vitaminsea.com</p>
          <p>+91 98765 43210</p>
        </div>

      </div>

      <div className="border-t border-white/20 mt-12 pt-6 text-center text-gray-300">
        © 2026 Vitamin Sea. All Rights Reserved.
      </div>

    </footer>
  );
}