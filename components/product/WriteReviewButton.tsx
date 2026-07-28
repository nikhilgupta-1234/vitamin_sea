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
      className="flex items-center gap-3 rounded-full bg-sky-500 px-7 py-4 font-medium text-white transition hover:bg-sky-600"
    >
      <MessageSquarePlus size={20} />
      Write a Review
    </button>
  );
}