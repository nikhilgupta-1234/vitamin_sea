"use client";

import Image from "next/image";
import Link from "next/link";

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

  const items = useAppSelector(
    (state) => state.cart.items
  );

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-12 font-serif text-5xl text-[#143D60]">
        Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-dashed bg-white p-20 text-center shadow-sm">
          <h2 className="text-3xl font-semibold text-gray-700">
            Your cart is empty
          </h2>

          <p className="mt-4 text-gray-500">
            Add some beautiful sea accessories to your cart.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block rounded-2xl bg-sky-500 px-8 py-4 text-white transition hover:bg-sky-600"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          {/* Cart Items */}
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={130}
                  height={130}
                  className="h-32 w-32 rounded-2xl object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold text-[#143D60]">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-xl font-bold text-sky-500">
                          ₹{item.price}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          dispatch(removeFromCart(item.id))
                        }
                        className="font-medium text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-xl border text-lg hover:bg-gray-100"
                    >
                      -
                    </button>

                    <span className="text-lg font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-xl border text-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="sticky top-24 h-fit rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="mb-8 font-serif text-3xl text-[#143D60]">
              Order Summary
            </h2>

            <div className="space-y-5">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-lg">
                <span>Shipping</span>
                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-3xl font-bold">
                <span>Total</span>
                <span>₹{subtotal}</span>
              </div>

              <Link
                href="/checkout"
                className="mt-8 block rounded-2xl bg-sky-500 py-4 text-center text-lg font-medium text-white transition hover:bg-sky-600"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}