"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { updateProduct } from "@/lib/updateProduct";

import { Product } from "@/types/product";
interface Props {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditProductDialog({
  open,
  product,
  onClose,
  onUpdated,
}: Props) {
  const [form, setForm] = useState<Product | null>(product);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(product);
  }, [product]);

  if (!open || !form) return null;

  async function handleUpdate() {
     if (!form) return;
    try {
      setLoading(true);

      await updateProduct(form.id, {
        name: form.name,
        description: form.description,
        category: form.category,
        price: String(form.price),
        stock: String(form.stock),
        featured: form.featured,
        image: form.image,
      });

      onUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update product.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-serif text-[#143D60]">
            Edit Product
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-4">

          <input
            className="w-full border rounded-xl p-4"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <textarea
            rows={4}
            className="w-full border rounded-xl p-4"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="w-full border rounded-xl p-4"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: Number(e.target.value),
              })
            }
          />

          <input
            type="number"
            className="w-full border rounded-xl p-4"
            value={form.stock}
            onChange={(e) =>
              setForm({
                ...form,
                stock: Number(e.target.value),
              })
            }
          />

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="w-full bg-sky-500 text-white rounded-xl py-4 hover:bg-sky-600"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>

        </div>
      </div>
    </div>
  );
}