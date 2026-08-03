"use client";

import { Star } from "lucide-react";

interface Props {
  rating: number;
  size?: number;
  totalReviews?: number;
  showCount?: boolean;
}

export default function RatingStars({
  rating,
  size = 18,
  totalReviews,
  showCount = false,
}: Props) {
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`Rating ${rating} out of 5`}
    >
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star;
          const half =
            rating >= star - 0.5 && rating < star;

          return (
            <div
              key={star}
              className="relative"
            >
              {/* Empty Star */}
              <Star
                size={size}
                className="text-gray-300"
              />

              {/* Filled / Half Star */}
              {(filled || half) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    width: filled ? "100%" : "50%",
                  }}
                >
                  <Star
                    size={size}
                    fill="currentColor"
                    className="text-yellow-400 transition-all duration-200"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showCount && (
        <span className="text-sm text-gray-500">
          ({totalReviews ?? 0})
        </span>
      )}
    </div>
  );
}