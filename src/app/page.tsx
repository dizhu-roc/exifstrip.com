import Nav from "@/components/home/Nav";
import IntroCarousel from "@/components/home/IntroCarousel";
import IntroCards from "@/components/home/IntroCards";
import UploadSection from "@/components/home/UploadSection";
import PrivacySection from "@/components/home/PrivacySection";
import ExifTableSection from "@/components/home/ExifTableSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <IntroCarousel />
        <IntroCards />
        <UploadSection />
        <PrivacySection />
        <ExifTableSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
