"use client";

import ProductForm from "@/components/admin/ProductForm";

export default function AddProductPage() {
  return (
    <main className="flex-1 bg-[#F8FAFC] p-8">
      <div className="rounded-[35px] bg-white p-10 shadow-sm">
        <h1 className="mb-8 font-serif text-5xl text-[#143D60]">
          Add Product
        </h1>

        <ProductForm />
      </div>
    </main>
  );
}