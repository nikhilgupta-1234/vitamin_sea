import Image from "next/image";

const posts = [
  "/instagram/1.jpg",
  "/instagram/2.jpg",
  "/instagram/3.jpg",
  "/instagram/4.jpg",
  "/instagram/5.jpg",
  "/instagram/6.jpg",
];

export default function InstagramGallery() {
  return (
    <section className="py-24 bg-[#F8F4EC]">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-serif text-center text-[#143D60]">
          Follow Our Journey
        </h2>

        <p className="text-center text-gray-500 mt-3 mb-12">
          @vitaminsea
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

          {posts.map((img, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl"
            >
              <Image
                src={img}
                alt="Instagram"
                width={300}
                height={300}
                className="w-full h-60 object-cover hover:scale-110 transition duration-500"
              />
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}