"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/store/cartSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "@/store/hooks";

export default function CartPage() {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = 0;

  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-5">

        {/* Heading */}

        <div className="mb-14">
          <h1 className="font-serif text-5xl text-[#143D60]">
            Shopping Cart
          </h1>

          <p className="mt-3 text-gray-500">
            {items.length} {items.length === 1 ? "Item" : "Items"} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[40px] bg-white p-16 text-center shadow-sm">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-sky-100">
              <ShoppingBag
                size={42}
                className="text-sky-500"
              />
            </div>

            <h2 className="mt-8 text-3xl font-semibold text-[#143D60]">
              Your Cart is Empty
            </h2>

            <p className="mx-auto mt-4 max-w-md text-gray-500">
              Looks like you haven't added any beach-inspired accessories yet.
            </p>

            <Link
              href="/shop"
              className="mt-10 inline-flex rounded-full bg-sky-500 px-8 py-4 font-semibold text-white transition hover:bg-sky-600"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[2fr_420px]">

            {/* Products */}

            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[30px] bg-white p-6 shadow-sm transition hover:shadow-lg"
                >
                  <div className="flex flex-col gap-6 md:flex-row">

                    <div className="relative h-36 w-full overflow-hidden rounded-3xl md:w-36">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">

                      <div className="flex flex-col gap-4 md:flex-row md:justify-between">

                        <div>
                          <h3 className="text-2xl font-semibold text-[#143D60]">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-sky-600 text-xl font-bold">
                            ₹{item.price}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            dispatch(removeFromCart(item.id))
                          }
                          className="flex items-center gap-2 text-red-500 transition hover:text-red-600"
                        >
                          <Trash2 size={18} />
                          Remove
                        </button>

                      </div>

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-6">

                        <div className="flex items-center overflow-hidden rounded-xl border">

                          <button
                            onClick={() =>
                              dispatch(decreaseQuantity(item.id))
                            }
                            className="flex h-11 w-11 items-center justify-center hover:bg-slate-100"
                          >
                            <Minus size={18} />
                          </button>

                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              dispatch(increaseQuantity(item.id))
                            }
                            className="flex h-11 w-11 items-center justify-center hover:bg-slate-100"
                          >
                            <Plus size={18} />
                          </button>

                        </div>

                        <div className="text-right">
                          <p className="text-gray-500 text-sm">
                            Total
                          </p>

                          <p className="text-2xl font-bold text-[#143D60]">
                            ₹{item.price * item.quantity}
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}

            <div className="sticky top-24 h-fit rounded-[35px] bg-white p-8 shadow-sm">

              <h2 className="font-serif text-3xl text-[#143D60]">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Shipping
                  </span>

                  <span className="font-semibold text-green-600">
                    Free
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Estimated Delivery
                  </span>

                  <span>
                    3-7 Days
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>

                  <span className="text-sky-600">
                    ₹{total}
                  </span>
                </div>

              </div>

              <Link
                href="/checkout"
                className="mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 py-4 text-lg font-semibold text-white transition hover:bg-sky-600"
              >
                <ShieldCheck size={20} />
                Secure Checkout
              </Link>

              <Link
                href="/shop"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border py-4 font-medium text-[#143D60] transition hover:bg-slate-50"
              >
                <Truck size={18} />
                Continue Shopping
              </Link>

              <div className="mt-8 rounded-2xl bg-sky-50 p-5">
                <p className="text-sm leading-7 text-gray-600">
                  ✔ Free shipping on all orders across India.
                  <br />
                  ✔ Secure payment with Razorpay.
                  <br />
                  ✔ Easy 7-day return policy.
                </p>
              </div>

            </div>

          </div>
        )}
      </div>
    </main>
  );
}