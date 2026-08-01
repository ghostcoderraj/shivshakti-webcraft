import { HelmetProvider } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SEOHead from "@/components/seo/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import ProductsPreview from "@/components/home/ProductsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

const homeFAQs = [
  {
    question: "What types of plywood machinery do you manufacture?",
    answer: "We manufacture a comprehensive range including Band Saw Blade Grinders, Finger Jointing Machines, Glue Spreaders, Belt Sanders, Wood Drying Chambers, and more.",
  },
  {
    question: "Do you provide installation and training services?",
    answer: "Yes, we provide complete installation support and operator training for all machinery at your facility.",
  },
  {
    question: "What is the warranty period for your machines?",
    answer: "We offer a standard 1-year warranty on all machinery covering manufacturing defects. Extended warranty options available.",
  },
  {
    question: "Do you export machinery outside India?",
    answer: "Yes, we export to Bangladesh, Nepal, Sri Lanka, African nations, and Middle East with complete documentation support.",
  },
];

const Index = () => {
  return (
    <HelmetProvider>
      <SEOHead
        title="Plywood Machinery Manufacturer in India"
        description="SHIV TECH - Leading plywood machinery and wood working equipment manufacturer in Ahmedabad, India. 23+ years experience. Band saw grinders, finger jointing machines, glue spreaders & more."
        keywords="plywood machinery manufacturer, wood working machinery manufacturer in India, plywood machinery Ahmedabad, saw mill machinery India, finger jointing machine manufacturer, band saw blade grinder India, glue spreader machine, wood drying chamber manufacturer"
        canonicalUrl="/"
        faqData={homeFAQs}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <TrustSection />
          <ProductsPreview />
          <WhyChooseUs />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
};

export default Index;
