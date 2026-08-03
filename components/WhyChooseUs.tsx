import {
  ShieldCheck,
  Gem,
  Truck,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: <Gem size={38} />,
    title: "Handmade",
    description:
      "Every piece is handcrafted with love and attention to every little detail.",
  },
  {
    icon: <ShieldCheck size={38} />,
    title: "Premium Quality",
    description:
      "Made using carefully selected natural shells, pearls and durable materials.",
  },
  {
    icon: <Truck size={38} />,
    title: "Fast Delivery",
    description:
      "Quick, safe and reliable shipping across India with secure packaging.",
  },
  {
    icon: <HeartHandshake size={38} />,
    title: "Customer First",
    description:
      "Friendly support, easy returns and a hassle-free shopping experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#F8F4EC] py-14 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">

          <h2 className="font-serif text-3xl text-[#143D60] sm:text-4xl lg:text-5xl">
            Why Choose Vitamin Sea?
          </h2>

          <p className="mt-4 text-gray-600 sm:text-lg">
            Beautiful handcrafted sea-inspired accessories designed
            to bring elegance, quality and a touch of the ocean to
            your everyday style.
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {features.map((item) => (
            <div
              key={item.title}
              className="group flex h-full flex-col rounded-3xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 text-sky-500 transition group-hover:bg-sky-500 group-hover:text-white">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-[#143D60]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-4 flex-grow leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}