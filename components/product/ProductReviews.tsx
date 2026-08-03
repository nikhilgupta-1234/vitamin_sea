"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

import RatingStars from "./RatingStars";
import { getReviews } from "@/lib/reviews";

interface Props {
  productId: number;
}

interface Review {
  id: number;
  customer_name: string;
  rating: number;
  review: string;
  created_at: string;
}

export default function ProductReviews({
  productId,
}: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  async function loadReviews() {
    setLoading(true);

    try {
      const data = await getReviews(productId);
      setReviews(data || []);
    } catch (error) {
      console.error(error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / reviews.length
      : 0;

  if (loading) {
    return (
      <section className="mt-12 rounded-3xl bg-white p-8 shadow-sm sm:mt-16 sm:p-12 lg:mt-20 lg:p-16">
        <div className="flex flex-col items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent" />

          <p className="mt-6 text-center text-gray-500">
            Loading Reviews...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12 sm:mt-16 lg:mt-20">

      {/* Header */}
      <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:mb-10 lg:p-10">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="text-center lg:text-left">

            <h2 className="font-serif text-3xl text-[#143D60] sm:text-4xl">
              Customer Reviews
            </h2>

            <p className="mt-3 text-gray-500">
              {reviews.length}{" "}
              {reviews.length === 1
                ? "Review"
                : "Reviews"}
            </p>

          </div>

          <div className="text-center lg:text-right">

            <p className="text-5xl font-bold text-[#143D60] sm:text-6xl">
              {averageRating.toFixed(1)}
            </p>

            <div className="mt-3 flex justify-center lg:justify-end">
              <RatingStars
                rating={Math.round(
                  averageRating
                )}
              />
            </div>

          </div>

        </div>

      </div>

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm sm:p-16">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 sm:h-20 sm:w-20">

            <MessageSquare
              size={32}
              className="text-sky-500"
            />

          </div>

          <h3 className="mt-6 text-2xl font-semibold text-[#143D60] sm:text-3xl">
            No Reviews Yet
          </h3>

          <p className="mt-3 text-gray-500">
            Be the first customer to review this
            beautiful product.
          </p>

        </div>
      )}

      {/* Reviews */}
      <div className="space-y-6 lg:space-y-8">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="rounded-3xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
          >

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white sm:h-14 sm:w-14">
                  {review.customer_name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h3 className="break-words text-lg font-semibold text-[#143D60] sm:text-xl">
                    {review.customer_name}
                  </h3>

                  <div className="mt-2">
                    <RatingStars
                      rating={review.rating}
                    />
                  </div>

                </div>

              </div>

              <p className="text-sm text-gray-500">
                {new Date(
                  review.created_at
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>

            </div>

            <p className="mt-6 break-words text-gray-600 leading-7 sm:leading-8">
              {review.review}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}