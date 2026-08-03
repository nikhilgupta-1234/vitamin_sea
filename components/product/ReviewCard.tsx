"use client";

import RatingStars from "./RatingStars";

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
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 lg:p-8">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-500 text-lg font-bold text-white">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>

            <h4 className="break-words text-lg font-semibold text-[#143D60]">
              {name}
            </h4>

            <p className="mt-1 text-sm text-gray-500">
              {new Date(createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>

            <div className="mt-2">
              <RatingStars rating={rating} />
            </div>

          </div>

        </div>

      </div>

      <p className="mt-6 break-words leading-7 text-gray-600 sm:text-lg sm:leading-8">
        {comment}
      </p>

    </div>
  );
}