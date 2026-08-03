"use client";

import RatingStars from "./RatingStars";

interface Props {
  average: number;
  total: number;
}

export default function ReviewSummary({
  average,
  total,
}: Props) {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-sky-50 to-white p-6 shadow-sm sm:p-8 lg:p-10">

      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="text-center lg:text-left">

          <p className="text-sm font-semibold uppercase tracking-[4px] text-sky-500">
            Customer Rating
          </p>

          <h2 className="mt-3 text-5xl font-bold text-[#143D60] sm:text-6xl">
            {average.toFixed(1)}
          </h2>

          <div className="mt-4 flex justify-center lg:justify-start">
            <RatingStars
              rating={average}
              size={24}
            />
          </div>

          <p className="mt-4 text-gray-500">
            Based on{" "}
            <span className="font-semibold text-[#143D60]">
              {total}
            </span>{" "}
            {total === 1 ? "review" : "reviews"}
          </p>

        </div>

        {/* Right */}
        <div className="w-full max-w-md space-y-4">

          {[5, 4, 3, 2, 1].map((star) => {

            const percentage =
              Math.max(
                10,
                star === Math.round(average)
                  ? 90
                  : 20
              );

            return (
              <div
                key={star}
                className="flex items-center gap-4"
              >

                <span className="w-5 text-sm font-medium text-gray-700">
                  {star}
                </span>

                <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">

                  <div
                    className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

                <span className="w-12 text-right text-sm text-gray-500">
                  {percentage}%
                </span>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}