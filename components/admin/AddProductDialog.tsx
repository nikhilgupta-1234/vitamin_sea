

"use client";
import { addProduct } from "@/lib/addProduct";


import { useState } from "react";
import { X } from "lucide-react";


interface Props {
  open: boolean;
  onClose: () => void;
}


export default function AddProductDialog({
  open,
  onClose,
}: Props) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    featured: false,
  });
  const [image, setImage] = useState<File | null>(null);

const [loading, setLoading] = useState(false);
 async function handleSave() {
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      await addProduct(product, image);

      alert("Product added successfully!");

      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

    return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-xl">

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-serif text-[#143D60]">
          Add Product
        </h2>

        <button onClick={onClose}>
          <X />
        </button>
      </div>

      <div className="grid gap-5">

        <input
          placeholder="Product Name"
          className="rounded-xl border p-4"
          value={product.name}
          onChange={(e) =>
            setProduct({ ...product, name: e.target.value })
          }
        />

        <textarea
          rows={4}
          placeholder="Description"
          className="rounded-xl border p-4"
          value={product.description}
          onChange={(e) =>
            setProduct({
              ...product,
              description: e.target.value,
            })
          }
        />

        <select
          className="rounded-xl border p-4"
          value={product.category}
          onChange={(e) =>
            setProduct({
              ...product,
              category: e.target.value,
            })
          }
        >
          <option value="">Select Category</option>
          <option>Hair Clips</option>
          <option>Earrings</option>
          <option>Necklaces</option>
          <option>Bracelets</option>
          <option>Anklets</option>
          <option>Gift Sets</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price"
            className="rounded-xl border p-4"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Stock"
            className="rounded-xl border p-4"
            value={product.stock}
            onChange={(e) =>
              setProduct({ ...product, stock: e.target.value })
            }
          />
        </div>

        <input
          type="file"
          onChange={(e) =>
            setImage(e.target.files?.[0] || null)
          }
          className="rounded-xl border p-3"
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={product.featured}
            onChange={(e) =>
              setProduct({
                ...product,
                featured: e.target.checked,
              })
            }
          />

          Featured Product
        </label>

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-xl bg-sky-500 py-4 text-white hover:bg-sky-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>

      </div>

    </div>
  </div>
);
  
  
}
