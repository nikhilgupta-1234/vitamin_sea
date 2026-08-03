"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  image: string;
}

export default function ProductGallery({
  image,
}: Props) {
  const [selected, setSelected] = useState(image);

  const images = [image, image, image, image];

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Main Image */}
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl border bg-white shadow-sm">
        <Image
          src={selected}
          alt="Product Image"
          width={900}
          height={900}
          priority
          className="h-[320px] w-full object-cover transition duration-500 hover:scale-105 sm:h-[450px] lg:h-[650px]"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelected(img)}
            className={`overflow-hidden rounded-xl border-2 transition-all duration-300 ${
              selected === img
                ? "border-sky-500 ring-2 ring-sky-200"
                : "border-gray-200 hover:border-sky-300"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${index + 1}`}
              width={200}
              height={200}
              className="h-20 w-full object-cover sm:h-24 lg:h-28"
            />
          </button>
        ))}
      </div>
    </div>
  );
}