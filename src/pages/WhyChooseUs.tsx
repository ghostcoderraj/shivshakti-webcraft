import { HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { CheckCircle, Award, Wrench, Truck, Shield, HeadphonesIcon, Zap } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SEOHead from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: Award,
    title: "23+ Years Experience",
    description: "Two decades of manufacturing excellence and industry expertise since 2002.",
    stats: "Since 2002",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every machine undergoes rigorous quality testing before delivery.",
    stats: "100% QC",
  },
  {
    icon: Zap,
    title: "Latest Technology",
    description: "Modern manufacturing with CNC machines and precision engineering.",
    stats: "Modern Tech",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Fast and safe delivery across all states in India and exports.",
    stats: "15+ States",
  },
  {
    icon: Wrench,
    title: "After-Sales Support",
    description: "Dedicated service team with spare parts availability across India.",
    stats: "Quick Support",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Consultation",
    description: "Technical guidance to help you choose the right machinery.",
    stats: "Free Consult",
  },
];

const differentiators = [
  "Factory-direct pricing with no middlemen or hidden costs",
  "Custom machinery solutions for unique requirements",
  "Complete installation and operator training included",
  "1-year standard warranty with extended options available",
  "Quick spare parts delivery anywhere in India",
  "Export-quality machines meeting international standards",
  "Proven track record with 50000+ installations",
  "Technical support via phone, email, and WhatsApp",
];

const WhyChooseUs = () => {
  return (
    <HelmetProvider>
      <SEOHead
        title="Why Choose Us - Best Plywood Machinery Manufacturer"
        description="Choose SHIV TECH for 23+ years experience, quality assured machinery, competitive pricing, pan-India support, and expert consultation. Leading plywood machinery manufacturer."
        keywords="best plywood machinery manufacturer, why choose SHIV TECH, quality machinery india, trusted machinery manufacturer"
        canonicalUrl="/why-choose-us"
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {/* Hero */}
          <section className="bg-gradient-hero py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <nav className="text-primary-foreground/60 text-sm mb-4">
                <Link to="/" className="hover:text-primary-foreground">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-primary-foreground">Why Choose Us</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
                Why Choose SHIV TECH?
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-2xl">
                Discover why 300+ industries trust us for their plywood and wood working machinery needs.
              </p>
            </div>
          </section>

          {/* Reasons Grid */}
          <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reasons.map((reason, index) => (
                  <div
                    key={reason.title}
                    className="card-industrial p-8 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                        <reason.icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className="px-3 py-1 bg-cta/10 text-cta text-sm font-semibold rounded-full">
                        {reason.stats}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                      {reason.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Differentiators */}
          <section className="py-16 lg:py-24 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                    What Sets Us Apart
                  </span>
                  <h2 className="section-title mb-6">
                    The SHIV TECH{" "}
                    <span className="text-gradient">Advantage</span>
                  </h2>
                  <ul className="space-y-4">
                    {differentiators.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 animate-slide-in-left"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-primary rounded-2xl p-8 lg:p-12 text-primary-foreground">
                  <h3 className="text-2xl font-heading font-bold mb-6">
                    Our Commitment to You
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary-foreground/10 rounded-xl flex items-center justify-center text-3xl font-bold">
                        1
                      </div>
                      <div>
                        <div className="font-semibold">Year Warranty</div>
                        <div className="text-primary-foreground/70 text-sm">Standard on all machines</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary-foreground/10 rounded-xl flex items-center justify-center text-3xl font-bold">
                        24
                      </div>
                      <div>
                        <div className="font-semibold">Hour Response</div>
                        <div className="text-primary-foreground/70 text-sm">For enquiries & support</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary-foreground/10 rounded-xl flex items-center justify-center text-3xl font-bold">
                        ∞
                      </div>
                      <div>
                        <div className="font-semibold">Lifetime Support</div>
                        <div className="text-primary-foreground/70 text-sm">Technical assistance always</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial Placeholder */}
          <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4 text-center">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                Trusted by Industry Leaders
              </span>
              <h2 className="section-title mb-6">50000+ Machines Installed</h2>
              <p className="section-subtitle mx-auto mb-8">
                Serving plywood manufacturers, saw mills, and furniture industries across India
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["Gujarat", "Maharashtra", "Rajasthan", "Karnataka", "Tamil Nadu", "Andhra Pradesh", "MP", "UP", "Bihar", "West Bengal"].map((state) => (
                  <span
                    key={state}
                    className="px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium"
                  >
                    {state}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-gradient-hero">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
                Experience the Difference
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Get in touch for a free consultation and discover why we're the preferred choice.
              </p>
              <Link to="/contact">
                <Button className="cta-button">Contact Us Today</Button>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
};

export default WhyChooseUs;
