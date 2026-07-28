import { ShieldCheck, Gem, Truck, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: <Gem size={40} className="text-sky-500" />,
    title: "Handmade",
    description: "Every piece is handcrafted with love and attention to detail.",
  },
  {
    icon: <ShieldCheck size={40} className="text-sky-500" />,
    title: "Premium Quality",
    description: "Made with natural shells, pearls, and durable materials.",
  },
  {
    icon: <Truck size={40} className="text-sky-500" />,
    title: "Fast Delivery",
    description: "Quick and secure shipping across India.",
  },
  {
    icon: <HeartHandshake size={40} className="text-sky-500" />,
    title: "Customer First",
    description: "Friendly support and hassle-free shopping experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F8F4EC] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-serif text-center text-[#143D60] mb-14">
          Why Choose Vitamin Sea?
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl shadow-md p-8 text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}