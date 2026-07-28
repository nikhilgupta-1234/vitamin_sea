"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

import { clearCart } from "@/store/cartSlice";
import { createOrder } from "@/lib/orders";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const items = useAppSelector(
    (state) => state.cart.items
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = async () => {
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !form.firstName ||
      !form.email ||
      !form.phone
    ) {
      alert("Please fill required fields.");
      return;
    }

    try {
      setLoading(true);

      await createOrder(
        items,
        subtotal,
        form
      );

      dispatch(clearCart());

      router.push("/order-success");
    } catch (error: any) {
      console.error(error);
      alert(
        error.message ||
          "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-12 font-serif text-5xl text-[#143D60]">
        Checkout
      </h1>

      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="mb-8 font-serif text-3xl text-[#143D60]">
            Shipping Details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="rounded-2xl border p-4"
            />

            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="rounded-2xl border p-4"
            />

            <input
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="rounded-2xl border p-4 md:col-span-2"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="rounded-2xl border p-4 md:col-span-2"
            />

            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              className="rounded-2xl border p-4 md:col-span-2"
            />

            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="rounded-2xl border p-4"
            />

            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              className="rounded-2xl border p-4"
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              className="rounded-2xl border p-4"
            />

            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="rounded-2xl border p-4"
            >
              <option>India</option>
            </select>
          </div>

          <button
            onClick={handleOrder}
            disabled={loading}
            className="mt-10 w-full rounded-2xl bg-sky-500 py-4 text-lg font-medium text-white"
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </div>

        <div className="sticky top-24 h-fit rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="mb-8 font-serif text-3xl text-[#143D60]">
            Order Summary
          </h2>

          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}

            <hr />

            <div className="flex justify-between text-lg">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}