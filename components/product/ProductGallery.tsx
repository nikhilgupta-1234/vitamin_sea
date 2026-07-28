"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  image: string;
}

export default function ProductGallery({
  image,
}: Props) {
  const [selected, setSelected] =
    useState(image);

  const images = [
    image,
    image,
    image,
    image,
  ];

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-3xl border bg-white">
        <Image
          src={selected}
          alt=""
          width={700}
          height={700}
          className="h-[650px] w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() =>
              setSelected(img)
            }
            className={`overflow-hidden rounded-2xl border ${
              selected === img
                ? "border-sky-500"
                : ""
            }`}
          >
            <Image
              src={img}
              alt=""
              width={150}
              height={150}
              className="h-28 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}