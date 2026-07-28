import Link from "next/link";

export default function OrderSuccess() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sky-50 px-6">
      <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
        <h1 className="text-5xl">
          🎉
        </h1>

        <h2 className="mt-6 text-4xl font-serif text-[#143D60]">
          Order Placed Successfully
        </h2>

        <p className="mt-4 text-gray-500">
          Thank you for shopping with Vitamin Sea.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full bg-sky-500 px-8 py-4 text-white"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}