"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Truck,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

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

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleOrder() {
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !form.firstName ||
      !form.email ||
      !form.phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createOrder(items, total, form);

      dispatch(clearCart());

      router.push("/order-success");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[#F8F4EC] py-10 sm:py-14 lg:py-20">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center">

          <p className="font-semibold uppercase tracking-[4px] text-sky-500">
            Secure Checkout
          </p>

          <h1 className="mt-3 font-serif text-4xl text-[#143D60] sm:text-5xl">
            Complete Your Order
          </h1>

        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

          {/* LEFT */}

          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:p-10">

            <h2 className="mb-8 text-3xl font-serif text-[#143D60]">
              Shipping Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {[
                ["firstName", "First Name"],
                ["lastName", "Last Name"],
              ].map(([name, placeholder]) => (
                <input
                  key={name}
                  name={name}
                  placeholder={placeholder}
                  value={(form as any)[name]}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                />
              ))}

              <input
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="rounded-2xl border border-gray-200 p-4 md:col-span-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />

              <input
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="rounded-2xl border border-gray-200 p-4 md:col-span-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />

              <input
                name="address"
                placeholder="Full Address"
                value={form.address}
                onChange={handleChange}
                className="rounded-2xl border border-gray-200 p-4 md:col-span-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="rounded-2xl border border-gray-200 p-4"
              />

              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="rounded-2xl border border-gray-200 p-4"
              />

              <input
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                className="rounded-2xl border border-gray-200 p-4"
              />

              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="rounded-2xl border border-gray-200 p-4"
              >
                <option>India</option>
              </select>

            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-sky-50 p-4 text-center">
                <Truck className="mx-auto mb-2 text-sky-500" />
                <p className="text-sm">Fast Delivery</p>
              </div>

              <div className="rounded-2xl bg-sky-50 p-4 text-center">
                <ShieldCheck className="mx-auto mb-2 text-sky-500" />
                <p className="text-sm">Secure Checkout</p>
              </div>

              <div className="rounded-2xl bg-sky-50 p-4 text-center">
                <CreditCard className="mx-auto mb-2 text-sky-500" />
                <p className="text-sm">Safe Payments</p>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm lg:sticky lg:top-24 lg:p-8">

            <h2 className="mb-8 text-3xl font-serif text-[#143D60]">
              Order Summary
            </h2>

            <div className="space-y-5">

              {items.map((item) => (

                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>
                    <p className="text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹{item.price * item.quantity}
                  </span>

                </div>

              ))}

              <hr />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-sky-600">
                  ₹{total}
                </span>
              </div>

            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center rounded-2xl bg-sky-500 py-4 text-lg font-semibold text-white transition hover:bg-sky-600 disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Placing Order...
                </div>
              ) : (
                "Place Order"
              )}
            </button>

          </aside>

        </div>

      </div>

    </main>
  );
}