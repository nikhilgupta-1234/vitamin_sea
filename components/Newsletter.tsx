export default function Newsletter() {
  return (
    <section className="bg-sky-500 py-20">

      <div className="max-w-3xl mx-auto text-center px-6">

        <h2 className="text-4xl text-white font-serif mb-4">
          Join Vitamin Sea
        </h2>

        <p className="text-sky-100 mb-8">
          Be the first to know about new arrivals,
          exclusive offers and beach-inspired collections.
        </p>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-full bg-white outline-none"
          />

          <button className="bg-[#143D60] hover:bg-[#0d2b45] text-white px-8 rounded-full">
            Subscribe
          </button>

        </div>

      </div>

    </section>
  );
}