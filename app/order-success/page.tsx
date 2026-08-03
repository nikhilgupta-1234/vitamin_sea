import Link from "next/link";
import {
  CheckCircle2,
  ShoppingBag,
  Package,
  ArrowRight,
} from "lucide-react";

export default function OrderSuccess() {
  return (
    <main className="min-h-screen bg-[#F8F4EC] flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl sm:p-10 lg:p-14">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2
              size={56}
              className="text-green-600"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="mt-8 text-center">

          <p className="font-semibold uppercase tracking-[4px] text-sky-500">
            Thank You
          </p>

          <h1 className="mt-3 font-serif text-3xl text-[#143D60] sm:text-4xl lg:text-5xl">
            Order Placed Successfully
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-gray-600">
            Your order has been confirmed successfully.
            We'll start preparing it right away and you'll
            receive an email confirmation shortly.
          </p>

        </div>

        {/* Info Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">

          <div className="rounded-2xl bg-sky-50 p-5">

            <Package
              size={28}
              className="mb-3 text-sky-500"
            />

            <h3 className="font-semibold text-[#143D60]">
              Estimated Delivery
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Within 3–7 business days.
            </p>

          </div>

          <div className="rounded-2xl bg-sky-50 p-5">

            <ShoppingBag
              size={28}
              className="mb-3 text-sky-500"
            />

            <h3 className="font-semibold text-[#143D60]">
              Order Status
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              Your order is now being processed.
            </p>

          </div>

        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/orders"
            className="flex flex-1 items-center justify-center rounded-2xl border border-sky-500 px-6 py-4 font-semibold text-sky-500 transition hover:bg-sky-50"
          >
            View Orders
          </Link>

          <Link
            href="/shop"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-sky-500 px-6 py-4 font-semibold text-white transition hover:bg-sky-600"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>

        </div>

        {/* Footer */}
        <div className="mt-10 border-t pt-6 text-center">

          <p className="text-sm text-gray-500">
            Need help?
          </p>

          <p className="mt-2 font-medium text-[#143D60]">
            support@vitaminsea.com
          </p>

        </div>

      </div>

    </main>
  );
}