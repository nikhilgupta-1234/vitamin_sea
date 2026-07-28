"use client";

import { useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { getReviews } from "@/lib/reviews";
import { MessageSquare } from "lucide-react";

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
      <section className="mt-20 rounded-[35px] bg-white p-16 shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>

          <p className="mt-6 text-lg text-gray-500">
            Loading Reviews...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-20">
      {/* Header */}

      <div className="mb-10 rounded-[35px] bg-white p-10 shadow-sm">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-4xl font-serif text-[#143D60]">
              Customer Reviews
            </h2>

            <p className="mt-3 text-gray-500">
              {reviews.length}{" "}
              {reviews.length === 1
                ? "Review"
                : "Reviews"}
            </p>
          </div>

          <div className="text-center md:text-right">

            <p className="text-6xl font-bold text-[#143D60]">
              {averageRating.toFixed(1)}
            </p>

            <div className="mt-3 flex justify-center md:justify-end">
              <RatingStars
                rating={Math.round(
                  averageRating
                )}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Empty */}

      {reviews.length === 0 && (
        <div className="rounded-[35px] bg-white p-16 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-100">
            <MessageSquare
              size={34}
              className="text-sky-500"
            />
          </div>

          <h3 className="mt-6 text-3xl font-semibold text-[#143D60]">
            No Reviews Yet
          </h3>

          <p className="mt-3 text-gray-500">
            Be the first customer to review this
            beautiful product.
          </p>
        </div>
      )}

      {/* Reviews */}

      <div className="space-y-8">

        {reviews.map((review) => (

          <div
            key={review.id}
            className="rounded-[30px] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div className="flex items-center gap-5">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white">
                  {review.customer_name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h3 className="text-xl font-semibold text-[#143D60]">
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

            <p className="mt-6 leading-8 text-gray-600">
              {review.review}
            </p>

          </div>

        ))}

      </div>
    </section>
  );
}