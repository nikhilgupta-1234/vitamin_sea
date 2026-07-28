"use client";

import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "@/lib/category";

interface Category {
  id: number;
  name: string;
}

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");

  async function loadCategories() {
    const data = await getCategories();
    setCategories(data || []);
  }

  useEffect(() => {
    loadCategories();
  }, []);

  async function handleAdd() {
    if (!name.trim()) return;

    await addCategory(name);

    setName("");

    loadCategories();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this category?")) return;

    await deleteCategory(id);

    loadCategories();
  }

  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-3xl font-bold">
        Categories
      </h2>

      <div className="mb-6 flex gap-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="flex-1 rounded-xl border p-3"
        />

        <button
          onClick={handleAdd}
          className="rounded-xl bg-sky-500 px-5 text-white"
        >
          <Plus />
        </button>

      </div>

      <table className="w-full">

        <tbody>

          {categories.map((category) => (

            <tr
              key={category.id}
              className="border-b"
            >

              <td className="py-5">
                {category.name}
              </td>

              <td className="text-right">

                <button
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="text-red-500" />
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}