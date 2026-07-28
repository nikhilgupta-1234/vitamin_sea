"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { addReview } from "@/lib/reviews";

interface Props {
  productId: number;
}

export default function ReviewForm({ productId }: Props) {
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

      if (err.message === "Please login to submit a review.") {
        alert("Please login to submit a review.");
      } else {
        alert(err.message || "Something went wrong while submitting your review.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-16 rounded-[32px] bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-[#143D60]">
        Write a Review
      </h2>

      <p className="mt-2 text-gray-500">
        Share your experience with this product.
      </p>

      {/* Rating */}
      <div className="mt-8">
        <label className="mb-3 block font-medium text-gray-700">
          Rating
        </label>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              disabled={loading}
              onClick={() => setRating(star)}
              className="transition hover:scale-110 disabled:cursor-not-allowed"
            >
              <Star
                size={30}
                fill={star <= rating ? "currentColor" : "none"}
                className={
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review */}
      <div className="mt-8">
        <label className="mb-2 block font-medium text-gray-700">
          Your Review
        </label>

        <textarea
          rows={6}
          value={review}
          disabled={loading}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Tell us what you think about this product..."
          className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-sky-500"
        />
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={submitReview}
        disabled={loading}
        className="mt-8 w-full rounded-2xl bg-sky-500 py-4 text-lg font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting Review..." : "Submit Review"}
      </button>
    </section>
  );
}