import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import BestSeller from "@/components/BestSeller";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import InstagramGallery from "@/components/InstagramGallery";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#F8F4EC]">
      <Navbar />
      <Hero />
      <CategorySection />
      <BestSeller />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
      <Footer />
    </main>
  );
}