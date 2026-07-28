"use client";

import { Star } from "lucide-react";

interface Props {
  average: number;
  total: number;
}

export default function ReviewSummary({
  average,
  total,
}: Props) {
  return (
    <div className="rounded-[35px] bg-sky-50 p-8">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div>
          <h2 className="text-5xl font-bold text-[#143D60]">
            {average.toFixed(1)}
          </h2>

          <div className="mt-2 flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                fill={
                  star <= Math.round(average)
                    ? "currentColor"
                    : "none"
                }
                className={
                  star <= Math.round(average)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <p className="mt-2 text-gray-500">
            Based on {total} reviews
          </p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          {[5, 4, 3, 2, 1].map((star) => (
            <div
              key={star}
              className="flex items-center gap-3"
            >
              <span>{star}</span>

              <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-yellow-400"
                  style={{
                    width:
                      star === Math.round(average)
                        ? "90%"
                        : "25%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}