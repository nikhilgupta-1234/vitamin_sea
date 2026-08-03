"use client";

import { MessageSquarePlus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function WriteReviewButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-sky-600 hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
    >
      <MessageSquarePlus
        size={20}
        className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
      />

      <span>Write a Review</span>
    </button>
  );
}