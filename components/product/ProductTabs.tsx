"use client";

import { useState } from "react";
import {
  FileText,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface Props {
  description?: string;
}

export default function ProductTabs({
  description,
}: Props) {
  const [tab, setTab] = useState("description");

  const tabs = [
    {
      id: "description",
      label: "Description",
      icon: FileText,
    },
    {
      id: "shipping",
      label: "Shipping",
      icon: Truck,
    },
    {
      id: "returns",
      label: "Returns",
      icon: RotateCcw,
    },
    {
      id: "care",
      label: "Care Guide",
      icon: Sparkles,
    },
  ];

  return (
    <section className="mt-12 rounded-3xl border bg-white p-5 shadow-sm sm:mt-16 sm:p-8 lg:mt-24 lg:p-10">

      {/* Tabs */}
      <div className="mb-8 overflow-x-auto pb-3">

        <div className="flex w-max gap-3 sm:w-auto sm:flex-wrap">

          {tabs.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 sm:text-base ${
                  tab === item.id
                    ? "bg-sky-500 text-white shadow-lg"
                    : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}

        </div>

      </div>

      {/* Content */}
      <div className="rounded-2xl bg-slate-50 p-5 sm:p-8">

        {tab === "description" && (
          <div className="space-y-5">

            <h3 className="text-2xl font-semibold text-[#143D60] sm:text-3xl">
              Product Description
            </h3>

            <p className="text-gray-600 leading-7 sm:text-lg sm:leading-8">
              {description?.trim()
                ? description
                : "No description has been added for this product yet."}
            </p>

          </div>
        )}

        {tab === "shipping" && (
          <div className="space-y-5">

            <h3 className="text-2xl font-semibold text-[#143D60] sm:text-3xl">
              Shipping Information
            </h3>

            <ul className="list-disc space-y-3 pl-5 text-gray-600 leading-7 sm:pl-6 sm:text-lg sm:leading-8">
              <li>Free shipping on all orders across India.</li>
              <li>Orders are processed within 24–48 hours.</li>
              <li>Estimated delivery: 3–7 business days.</li>
              <li>Tracking details are shared after dispatch.</li>
              <li>Express delivery available in select cities.</li>
            </ul>

          </div>
        )}

        {tab === "returns" && (
          <div className="space-y-5">

            <h3 className="text-2xl font-semibold text-[#143D60] sm:text-3xl">
              Return Policy
            </h3>

            <ul className="list-disc space-y-3 pl-5 text-gray-600 leading-7 sm:pl-6 sm:text-lg sm:leading-8">
              <li>Returns accepted within 7 days of delivery.</li>
              <li>Items must be unused and in original packaging.</li>
              <li>Customized items cannot be returned.</li>
              <li>Quality inspection is required before refund.</li>
              <li>Refunds are processed within 5–7 business days.</li>
            </ul>

          </div>
        )}

        {tab === "care" && (
          <div className="space-y-5">

            <h3 className="text-2xl font-semibold text-[#143D60] sm:text-3xl">
              Care Instructions
            </h3>

            <ul className="list-disc space-y-3 pl-5 text-gray-600 leading-7 sm:pl-6 sm:text-lg sm:leading-8">
              <li>Keep away from water and perfumes.</li>
              <li>Store in a cool and dry place.</li>
              <li>Clean gently with a soft cloth.</li>
              <li>Avoid dropping delicate shell pieces.</li>
              <li>Store separately to prevent scratches.</li>
            </ul>

          </div>
        )}

      </div>

    </section>
  );
}