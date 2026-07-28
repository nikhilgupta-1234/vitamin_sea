"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    review:
      "Absolutely loved the shell earrings! They look premium and are very lightweight.",
  },
  {
    name: "Ananya Roy",
    review:
      "The packaging was beautiful and the quality exceeded my expectations.",
  },
  {
    name: "Sneha Patel",
    review:
      "Perfect accessories for beach vacations. Will definitely order again!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-serif text-center text-[#143D60] mb-14">
          What Our Customers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-[#F8F4EC] p-8 rounded-3xl shadow-sm hover:shadow-lg transition"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={18} fill="currentColor" />
                ))}
              </div>

              <p className="text-gray-600 italic mb-6">
                "{review.review}"
              </p>

              <h4 className="font-semibold text-[#143D60]">
                {review.name}
              </h4>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}