"use client";

interface Props {
  quantity: number;
  setQuantity: (value: number) => void;
}

export default function QuantitySelector({
  quantity,
  setQuantity,
}: Props) {
  return (
    <div className="flex items-center gap-5">
      <span className="font-medium text-gray-600">
        Quantity
      </span>

      <div className="flex items-center overflow-hidden rounded-xl border">
        <button
          onClick={() =>
            setQuantity(Math.max(1, quantity - 1))
          }
          className="px-4 py-2 text-xl hover:bg-gray-100"
        >
          −
        </button>

        <span className="w-12 text-center">
          {quantity}
        </span>

        <button
          onClick={() =>
            setQuantity(quantity + 1)
          }
          className="px-4 py-2 text-xl hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
}