"use client";

interface Props {
  quantity: number;
  setQuantity: (value: number) => void;
}

export default function QuantitySelector({
  quantity,
  setQuantity,
}: Props) {
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">

      <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        Quantity
      </span>

      <div className="flex w-fit items-center overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <button
          type="button"
          onClick={decrease}
          disabled={quantity === 1}
          className="flex h-12 w-12 items-center justify-center text-2xl font-medium transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>

        <div className="flex h-12 min-w-[60px] items-center justify-center border-x border-gray-200 px-4 text-lg font-bold text-[#143D60]">
          {quantity}
        </div>

        <button
          type="button"
          onClick={increase}
          className="flex h-12 w-12 items-center justify-center text-2xl font-medium transition hover:bg-sky-50"
        >
          +
        </button>

      </div>

    </div>
  );
}