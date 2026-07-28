import {
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="bg-[#fafafa]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-sky-50 to-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-4 uppercase tracking-[6px] text-sky-500">
            Get In Touch
          </p>

          <h1 className="font-serif text-6xl text-[#143D60]">
            Contact Us
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            We'd love to hear from you. Whether you have a question,
            feedback, or need help with an order, we're here for you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Side */}
          <div className="rounded-[40px] bg-sky-500 p-12 text-white shadow-xl">
            <h2 className="font-serif text-4xl">
              Let's Connect
            </h2>

            <p className="mt-6 text-lg text-sky-100">
              Have a question about our products or your order?
              Reach out to us anytime.
            </p>

            <div className="mt-12 space-y-8">
              <div className="flex items-center gap-5">
                <Mail size={28} />
                <div>
                  <p className="text-sm text-sky-200">
                    Email
                  </p>
                  <p>support@vitaminsea.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <Phone size={28} />
                <div>
                  <p className="text-sm text-sky-200">
                    Phone
                  </p>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <MapPin size={28} />
                <div>
                  <p className="text-sm text-sky-200">
                    Location
                  </p>
                  <p>Jamshedpur, Jharkhand, India</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <Globe size={28} />
                <div>
                  <p className="text-sm text-sky-200">
                    Instagram
                  </p>
                  <p>@vitaminsea</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form */}
          <div className="rounded-[40px] bg-white p-12 shadow-lg">
            <h2 className="font-serif text-4xl text-[#143D60]">
              Send A Message
            </h2>

            <form className="mt-10 space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl border p-4 outline-none focus:border-sky-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border p-4 outline-none focus:border-sky-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-2xl border p-4 outline-none focus:border-sky-500"
              />

              <textarea
                rows={6}
                placeholder="Your Message"
                className="w-full rounded-2xl border p-4 outline-none focus:border-sky-500"
              />

              <button
                type="submit"
                className="w-full rounded-2xl bg-sky-500 py-4 text-lg font-medium text-white transition hover:bg-sky-600"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-5xl text-[#143D60]">
            Need Help?
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            We usually reply within 24 hours and are happy to help
            with orders, shipping and product information.
          </p>
        </div>
      </section>
    </main>
  );
}