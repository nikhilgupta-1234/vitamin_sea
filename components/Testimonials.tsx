"use client";

import { Star, BadgeCheck } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    review:
      "Absolutely loved the shell earrings! They look premium, lightweight, and exactly like the pictures.",
  },
  {
    name: "Ananya Roy",
    review:
      "The packaging was beautiful and the quality exceeded my expectations. Perfect for gifting.",
  },
  {
    name: "Sneha Patel",
    review:
      "Perfect accessories for beach vacations. Amazing craftsmanship and fast delivery. I'll definitely order again!",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">

          <h2 className="font-serif text-3xl text-[#143D60] sm:text-4xl lg:text-5xl">
            What Our Customers Say
          </h2>

          <p className="mt-4 text-gray-600 sm:text-lg">
            Thousands of happy customers love our handcrafted
            ocean-inspired accessories.
          </p>

        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="group flex h-full flex-col rounded-3xl bg-[#F8F4EC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-8"
            >

              {/* Stars */}
              <div className="mb-5 flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="flex-grow leading-8 italic text-gray-600">
                "{review.review}"
              </p>

              {/* Customer */}
              <div className="mt-8 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white">
                  {review.name.charAt(0)}
                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h4 className="font-semibold text-[#143D60]">
                      {review.name}
                    </h4>

                    <BadgeCheck
                      size={18}
                      className="text-sky-500"
                    />

                  </div>

                  <p className="text-sm text-gray-500">
                    Verified Buyer
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}