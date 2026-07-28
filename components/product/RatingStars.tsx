"use client";

import { Star } from "lucide-react";

interface Props {
  rating: number;
  size?: number;
}

export default function RatingStars({
  rating,
  size = 18,
}: Props) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={
            star <= rating
              ? "currentColor"
              : "none"
          }
          className={
            star <= rating
              ? "text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}