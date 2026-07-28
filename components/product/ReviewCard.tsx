"use client";

import { Star } from "lucide-react";

interface Props {
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export default function ReviewCard({
  name,
  rating,
  comment,
  createdAt,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-[#143D60]">
            {name}
          </h4>

          <p className="text-sm text-gray-500">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
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
      </div>

      <p className="mt-5 leading-7 text-gray-600">
        {comment}
      </p>
    </div>
  );
}