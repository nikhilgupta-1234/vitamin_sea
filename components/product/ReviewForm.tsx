"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { addReview } from "@/lib/reviews";

interface Props {
  productId: number;
}

export default function ReviewForm({
  productId,
}: Props) {
  const router = useRouter();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitReview() {
    const customerReview = review.trim();

    if (!customerReview) {
      alert("Please write a review.");
      return;
    }

    if (customerReview.length < 10) {
      alert("Review should be at least 10 characters.");
      return;
    }

    try {
      setLoading(true);

      await addReview(
        productId,
        rating,
        customerReview
      );

      alert("Thank you! Your review has been submitted.");

      setReview("");
      setRating(5);

      router.refresh();
    } catch (err: any) {
      console.error(err);

      alert(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-14 rounded-3xl bg-white p-6 shadow-sm sm:mt-16 sm:p-8 lg:mt-20 lg:p-10">

      <div className="mb-8 text-center">

        <p className="text-sm font-semibold uppercase tracking-[4px] text-sky-500">
          Share Your Experience
        </p>

        <h2 className="mt-2 font-serif text-3xl text-[#143D60] sm:text-4xl">
          Write a Review
        </h2>

        <p className="mt-3 text-gray-500">
          We'd love to hear what you think about this product.
        </p>

      </div>

      {/* Rating */}

      <div>

        <label className="mb-4 block font-semibold text-gray-700">
          Your Rating
        </label>

        <div className="flex flex-wrap gap-3">

          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={loading}
              onClick={() => setRating(star)}
              className="transition hover:scale-110 disabled:cursor-not-allowed"
            >
              <Star
                size={34}
                fill={
                  star <= rating
                    ? "currentColor"
                    : "none"
                }
                className={`transition ${
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}

        </div>

      </div>

      {/* Review */}

      <div className="mt-8">

        <div className="mb-2 flex items-center justify-between">

          <label className="font-semibold text-gray-700">
            Your Review
          </label>

          <span className="text-sm text-gray-400">
            {review.length}/500
          </span>

        </div>

        <textarea
          rows={6}
          maxLength={500}
          disabled={loading}
          value={review}
          onChange={(e) =>
            setReview(e.target.value)
          }
          placeholder="Tell other customers what you liked about this product..."
          className="min-h-[180px] w-full rounded-2xl border border-gray-200 p-5 text-gray-700 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        />

      </div>

      {/* Button */}

      <button
        type="button"
        disabled={loading}
        onClick={submitReview}
        className="mt-8 flex w-full items-center justify-center rounded-2xl bg-sky-500 py-4 text-lg font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Submitting...
          </div>
        ) : (
          "Submit Review"
        )}
      </button>

    </section>
  );
}