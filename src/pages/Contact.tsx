import { HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SEOHead from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Enquiry Submitted!",
      description: "Thank you for your interest. Our team will contact you within 24 hours.",
    });
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      product: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <HelmetProvider>
      <SEOHead
        title="Contact Us - Get Quote for Plywood Machinery"
        description="Contact SHIV TECH for plywood machinery enquiries. Call +91 76004 44740 or email shivtechmachinery@gmail.com. Located in Ahmedabad, Gujarat, India."
        keywords="contact SHIV TECH, plywood machinery enquiry, get quote plywood machines, machinery manufacturer contact ahmedabad"
        canonicalUrl="/contact"
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
                <span className="text-primary-foreground">Contact Us</span>
              </nav>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
                Get in Touch
              </h1>
              <p className="text-lg text-primary-foreground/80 max-w-2xl">
                Have questions about our machinery? Request a quote or get expert consultation.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Contact Info */}
                <div>
                  <h2 className="section-title mb-8">Contact Information</h2>
                  
                  <div className="space-y-6 mb-10">
                    <a
                      href="tel:+917600444740"
                      className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Phone className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Phone</div>
                        <div className="text-primary font-medium">+91 76004 44740</div>
                        <div className="text-muted-foreground text-sm">Mon-Sat, 9AM-6PM</div>
                      </div>
                    </a>

                    <a
                      href="https://wa.me/917600444740"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-success/30 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center group-hover:bg-success transition-colors">
                        <MessageCircle className="w-6 h-6 text-success group-hover:text-success-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">WhatsApp</div>
                        <div className="text-success font-medium">+91 76004 44740</div>
                        <div className="text-muted-foreground text-sm">Quick responses</div>
                      </div>
                    </a>

                    <a
                      href="mailto:shivtechmachinery@gmail.com"
                      className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Mail className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Email</div>
                        <div className="text-primary font-medium">shivtechmachinery@gmail.com</div>
                        <div className="text-muted-foreground text-sm">We reply within 24 hours</div>
                      </div>
                    </a>

                    <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Factory Address</div>
                        <div className="text-muted-foreground">
                          Plot-4, Supreme Industrial Park 2,<br />
                          Vahelal - Dahegam Rd, Zak,<br />
                          Ahmedabad - 382330, Gujarat, India
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Working Hours</div>
                        <div className="text-muted-foreground">
                          Monday - Saturday: 9:00 AM - 6:00 PM<br />
                          Sunday: Closed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <div className="bg-card rounded-2xl border border-border p-8 lg:p-10">
                    <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
                      Request a Quote
                    </h2>
                    <p className="text-muted-foreground mb-8">
                      Fill the form below and our team will get back to you within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-2"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="mt-2"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-2"
                            placeholder="your@email.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="mt-2"
                            placeholder="Your company"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="product">Interested Product</Label>
                        <select
                          id="product"
                          name="product"
                          value={formData.product}
                          onChange={handleChange}
                          className="mt-2 w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                        >
                          <option value="">Select a product</option>
                          <option value="band-saw-grinder">Band Saw Blade Grinder</option>
                          <option value="finger-jointing">Finger Jointing Machine</option>
                          <option value="glue-spreader">Glue Spreader Machine</option>
                          <option value="belt-sander">Belt Sander Machine</option>
                          <option value="drying-chamber">Wood Drying Chamber</option>
                          <option value="rip-saw">Rip Saw Machine</option>
                          <option value="dust-collector">Dust Collector System</option>
                          <option value="other">Other / Multiple Products</option>
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="message">Your Requirements *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="mt-2 min-h-[120px]"
                          placeholder="Describe your requirements, quantity needed, or any questions..."
                        />
                      </div>

                      <Button
                        type="submit"
                        className="cta-button w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            Submit Enquiry
                            <Send className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Map */}
          <section className="h-96 bg-secondary">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.5!2d72.7531311!3d23.0896911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA1JzIyLjkiTiA3MsKwNDUnMTEuMyJF!5e0!3m2!1sen!2sin!4v1706000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="SHIV TECH Location - Ahmedabad, Gujarat"
            />
          </section>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
};

export default Contact;
