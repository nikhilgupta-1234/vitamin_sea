"use client";
import { deleteProduct } from "@/lib/deleteProduct";
import EditProductDialog from "./EditProductDialog";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AddProductDialog from "./AddProductDialog";

import { Product } from "@/types/product";
export default function ProductTable() {
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    async function handleDelete(id: number) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await deleteProduct(id);
            await fetchProducts();
            alert("Product deleted successfully.");
        } catch (error) {
            console.error(error);
            alert("Failed to delete product.");
        }
    }

    async function fetchProducts() {
        setLoading(true);

        let query = supabase
            .from("products")
            .select("*")
            .order("id", { ascending: false });

        if (search.trim()) {
            query = query.ilike("name", `%${search}%`);
        }

        const { data, error } = await query;

        if (error) {
            console.error(error);
        } else {
            setProducts(data || []);
        }

        setLoading(false);
    }
    useEffect(() => {
        fetchProducts();
    }, [search]);

    return (
        <>
            <div className="bg-white rounded-3xl shadow-lg p-8">

                <div className="flex justify-between items-center mb-8">

                    <div>
                        <h2 className="text-2xl font-semibold">
                            Products
                        </h2>

                        <p className="text-gray-500">
                            Manage your inventory
                        </p>
                    </div>

                    <button
                        onClick={() => setOpen(true)}
                        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl"
                    >
                        <Plus size={18} />
                        Add Product
                    </button>

                </div>
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>

                {loading ? (

                    <div className="text-center py-10">
                        Loading Products...
                    </div>


                ) : (

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-4">Product</th>
                                <th className="text-left">Category</th>
                                <th className="text-left">Price</th>
                                <th className="text-left">Stock</th>
                                <th className="text-center">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {products.map((product) => (

                                <tr
                                    key={product.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="py-5">
                                        <div className="flex items-center gap-4">

                                            <Image
                                                src={product.image || "/placeholder.png"}
                                                alt={product.name}
                                                width={60}
                                                height={60}
                                                className="rounded-xl object-cover"
                                            />

                                            <div>
                                                <p className="font-semibold">{product.name}</p>

                                                <p className="text-sm text-gray-500">
                                                    #{product.id}
                                                </p>
                                            </div>

                                        </div>
                                    </td>

                                    <td>
                                        {product.category}
                                    </td>

                                    <td>
                                        ₹ {product.price}
                                    </td>

                                    <td>
                                        {product.stock}
                                    </td>

                                    <td>

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setEditOpen(true);
                                                }}
                                                className="p-2 rounded-lg hover:bg-sky-100"
                                            >
                                                <Pencil
                                                    size={18}
                                                    className="text-sky-600"
                                                />
                                            </button>

                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 rounded-lg hover:bg-red-100"
                                            >
                                                <Trash2
                                                    size={18}
                                                    className="text-red-500"
                                                />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                )}

            </div>

            <AddProductDialog
                open={open}
                onClose={() => {
                    setOpen(false);
                    fetchProducts();
                }}


            />
            <EditProductDialog
                open={editOpen}
                product={selectedProduct}
                onClose={() => setEditOpen(false)}
                onUpdated={fetchProducts}
            />

        </>
    );
}