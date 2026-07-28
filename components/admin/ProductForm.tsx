"use client";

export default function ProductForm({
  product,
}: {
  product?: any;
}) {
  return (
    <div className="space-y-6">
      <input
        defaultValue={product?.name}
        placeholder="Product Name"
        className="w-full rounded-2xl border p-4"
      />

      <textarea
        defaultValue={product?.description}
        placeholder="Description"
        className="h-40 w-full rounded-2xl border p-4"
      />

      <input
        defaultValue={product?.price}
        type="number"
        placeholder="Price"
        className="w-full rounded-2xl border p-4"
      />

      <button className="rounded-2xl bg-sky-500 px-8 py-4 text-white">
        {product ? "Update Product" : "Save Product"}
      </button>
    </div>
  );
}