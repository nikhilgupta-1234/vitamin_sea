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
    <section className="mt-24 rounded-[35px] bg-white p-8 shadow-sm md:p-10">
      {/* Tabs */}
      <div className="mb-10 flex flex-wrap gap-4 border-b pb-6">
        {tabs.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all md:text-base ${
                tab === item.id
                  ? "bg-sky-500 text-white shadow-md"
                  : "bg-slate-100 text-gray-600 hover:bg-slate-200"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Description */}
      {tab === "description" && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-[#143D60]">
            Product Description
          </h3>

          <p className="leading-8 text-gray-600">
            {description?.trim()
              ? description
              : "No description has been added for this product yet."}
          </p>
        </div>
      )}

      {/* Shipping */}
      {tab === "shipping" && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-[#143D60]">
            Shipping Information
          </h3>

          <ul className="list-disc space-y-3 pl-6 leading-8 text-gray-600">
            <li>Free shipping on all orders across India.</li>
            <li>Orders are processed within 24–48 hours.</li>
            <li>Estimated delivery: 3–7 business days.</li>
            <li>Tracking details will be shared via email after dispatch.</li>
            <li>Express delivery may be available in select cities.</li>
          </ul>
        </div>
      )}

      {/* Returns */}
      {tab === "returns" && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-[#143D60]">
            Return Policy
          </h3>

          <ul className="list-disc space-y-3 pl-6 leading-8 text-gray-600">
            <li>Returns are accepted within 7 days of delivery.</li>
            <li>Products must be unused and in their original packaging.</li>
            <li>Customized products cannot be returned.</li>
            <li>Refunds are processed after successful quality inspection.</li>
            <li>Refunds are credited within 5–7 business days.</li>
          </ul>
        </div>
      )}

      {/* Care Guide */}
      {tab === "care" && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold text-[#143D60]">
            Care Instructions
          </h3>

          <ul className="list-disc space-y-3 pl-6 leading-8 text-gray-600">
            <li>Keep away from water and perfumes.</li>
            <li>Store in a dry, cool place.</li>
            <li>Clean gently with a soft cloth.</li>
            <li>Avoid dropping or bending delicate shell pieces.</li>
            <li>Store separately to prevent scratches.</li>
          </ul>
        </div>
      )}
    </section>
  );
}