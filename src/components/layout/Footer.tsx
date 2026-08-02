import logo from "@/assets/shivtech-logo.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronDown,
  ExternalLink,
  MessageCircle,
  ArrowRight,
  Award,
  Shield,
  Globe,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Why Choose Us", path: "/why-choose-us" },
    { name: "Contact Us", path: "/contact" },
  ];

  const productLinks = [
    { name: "Plywood Machinery", path: "/products" },
    { name: "Band Saw Blade Grinder", path: "/products/band-saw-blade-grinder" },
    { name: "Finger Jointing Machines", path: "/products/finger-jointing-machines" },
    { name: "Glue Spreader Machines", path: "/products/glue-spreader-machines" },
    { name: "Belt Sander Machines", path: "/products/belt-sander-machines" },
    { name: "Wood Drying Chamber", path: "/products/wood-drying-chamber" },
    { name: "Edge Cutting Machines", path: "/products/edge-cutting-machines" },
    { name: "Rip Saw Machines", path: "/products/rip-saw-machines" },
  ];

  const trustBadges = [
    { icon: Award, text: "23+ Years Experience" },
    { icon: Shield, text: "Industry Trusted" },
    { icon: Globe, text: "Made in India" },
  ];

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Link hover animation component
  const FooterLink = ({ to, children, external = false }: { to: string; children: React.ReactNode; external?: boolean }) => (
    <motion.div
      className="group relative"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      {external ? (
        <a 
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm py-1.5"
        >
          <span className="relative">
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-cta group-hover:w-full transition-all duration-300" />
          </span>
          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      ) : (
        <Link 
          to={to}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm py-1.5"
        >
          <span className="relative">
            {children}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-cta group-hover:w-full transition-all duration-300" />
          </span>
        </Link>
      )}
    </motion.div>
  );

  // Accordion section for mobile
  const AccordionSection = ({ title, id, children }: { title: string; id: string; children: React.ReactNode }) => (
    <div className="lg:hidden border-b border-white/10">
      <button
        onClick={() => toggleAccordion(id)}
        className="w-full flex items-center justify-between py-4 text-white font-semibold"
      >
        <span>{title}</span>
        <motion.div
          animate={{ rotate: openAccordion === id ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ 
          height: openAccordion === id ? "auto" : 0,
          opacity: openAccordion === id ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pb-4">
          {children}
        </div>
      </motion.div>
    </div>
  );

  return (
    <footer 
      className="relative overflow-hidden"
      itemScope 
      itemType="https://schema.org/WPFooter"
    >
      {/* Industrial Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2B1D14] via-[#3A2718] to-[#1C120B]" />
      
      {/* Subtle Industrial Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Top Decorative Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cta to-transparent opacity-60" />

      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />

      {/* Main Footer Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-16 lg:py-20">
          
          {/* Desktop 4-Column Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Column 1: Brand & Trust */}
            <div className="lg:col-span-4">
              {/* Logo */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div 
                  className="h-16 rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden bg-white px-2"
                  style={{
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                  }}
                >
                  <img src={logo} alt="SHIV TECH Logo" className="h-full w-auto object-contain" />
                </div>
                <div>
                  <h3 className="text-white font-heading font-bold text-xl">
                    SHIV TECH
                  </h3>
                </div>
              </motion.div>

              {/* Brand Statement */}
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                23+ Years of Excellence in Plywood & Wood Working Machinery Manufacturing. 
                Trusted by industries across India and worldwide.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {trustBadges.map((badge, index) => (
                  <motion.div
                    key={badge.text}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
                  >
                    <badge.icon className="w-4 h-4 text-cta" />
                    <span className="text-xs text-gray-300 font-medium">{badge.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Certificates */}
              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href="/certificates/gst-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cta/50 hover:bg-white/10 transition-colors"
                >
                  <FileText className="w-4 h-4 text-cta" />
                  <span className="text-xs text-gray-300 font-medium">GST Certificate</span>
                </a>
                <a
                  href="/certificates/udyam-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:border-cta/50 hover:bg-white/10 transition-colors"
                >
                  <FileText className="w-4 h-4 text-cta" />
                  <span className="text-xs text-gray-300 font-medium">Udyam Certificate</span>
                </a>
              </div>

              {/* Industrial Divider */}
              <div className="w-20 h-0.5 bg-gradient-to-r from-cta to-transparent rounded-full" />
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-heading font-semibold text-base mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cta rounded-full" />
                Quick Links
              </h4>
              <nav className="space-y-1" aria-label="Quick Links">
                {quickLinks.map((link) => (
                  <FooterLink key={link.path} to={link.path}>
                    {link.name}
                  </FooterLink>
                ))}
              </nav>
            </div>

            {/* Column 3: Products */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-heading font-semibold text-base mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cta rounded-full" />
                Our Products
              </h4>
              <nav className="space-y-1" aria-label="Products">
                {productLinks.map((link) => (
                  <FooterLink key={link.path} to={link.path}>
                    {link.name}
                  </FooterLink>
                ))}
              </nav>
            </div>

            {/* Column 4: Contact & CTA */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-heading font-semibold text-base mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cta rounded-full" />
                Contact Us
              </h4>

              {/* Contact Details */}
              <div 
                className="space-y-4 mb-8"
                itemScope 
                itemType="https://schema.org/Organization"
              >
                <meta itemProp="name" content="SHIV TECH" />
                
                {/* Address */}
                <div 
                  className="flex items-start gap-3 group"
                  itemProp="address" 
                  itemScope 
                  itemType="https://schema.org/PostalAddress"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cta/20 group-hover:border-cta/30 transition-colors">
                    <MapPin className="w-4 h-4 text-cta" />
                  </div>
                  <div className="text-sm text-gray-400">
                    <span itemProp="streetAddress">Plot-4, Supreme Industrial Park 2, Vahelal - Dahegam Rd, Zak</span><br />
                    <span itemProp="addressLocality">Ahmedabad</span>, <span itemProp="addressRegion">Gujarat</span> - <span itemProp="postalCode">382330</span><br />
                    <span itemProp="addressCountry">India</span>
                  </div>
                </div>

                {/* Phone */}
                <a 
                  href="tel:+917600444740"
                  className="flex items-center gap-3 group"
                  itemProp="telephone"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cta/20 group-hover:border-cta/30 transition-colors">
                    <Phone className="w-4 h-4 text-cta" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                    +91 76004 44740
                  </span>
                </a>

                {/* Email */}
                <a 
                  href="mailto:shivtechmachinery@gmail.com"
                  className="flex items-center gap-3 group"
                  itemProp="email"
                >
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cta/20 group-hover:border-cta/30 transition-colors">
                    <Mail className="w-4 h-4 text-cta" />
                  </div>
                  <span className="text-sm text-gray-400 group-hover:text-white transition-colors break-all">
                    shivtechmachinery@gmail.com
                  </span>
                </a>

                {/* Hours */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-cta" />
                  </div>
                  <span className="text-sm text-gray-400">
                    Mon - Sat: 9:00 AM - 6:00 PM
                  </span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                {/* WhatsApp Button */}
                <motion.a
                  href="https://wa.me/917600444740?text=Hello!%20I'm%20interested%20in%20your%20plywood%20machinery."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    boxShadow: '0 8px 25px -8px rgba(37, 211, 102, 0.4)',
                    color: 'white'
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </motion.a>

                {/* Request Quote Button */}
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, #C8862B 0%, #8F6020 100%)',
                      boxShadow: '0 8px 25px -8px rgba(249, 115, 22, 0.4)',
                      color: 'white'
                    }}
                  >
                    Request a Quote
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Link>

                {/* Google Maps Link */}
                <motion.a
                  href="https://maps.google.com/maps?q=23.0896911%2C72.7531311&z=17&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                >
                  <MapPin className="w-4 h-4" />
                  View on Google Maps
                  <ExternalLink className="w-3 h-3" />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Mobile Layout with Accordions */}
          <div className="lg:hidden">
            {/* Brand Section */}
            <div className="mb-8 pb-8 border-b border-white/10">
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="h-14 rounded-xl flex items-center justify-center border border-white/10 overflow-hidden bg-white px-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                  }}
                >
                  <img src={logo} alt="SHIV TECH Logo" className="h-full w-auto object-contain bg-white" />
                </div>
                <div>
                  <h3 className="text-white font-heading font-bold text-lg">
                    SHIV TECH
                  </h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                23+ Years of Excellence in Plywood & Wood Working Machinery Manufacturing.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.text}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5"
                  >
                    <badge.icon className="w-3.5 h-3.5 text-cta" />
                    <span className="text-xs text-gray-300">{badge.text}</span>
                  </div>
                ))}
              </div>
              {/* Mobile Certificates */}
              <div className="flex flex-wrap gap-2">
                <a
                  href="/certificates/gst-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-cta/50 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-cta" />
                  <span className="text-xs text-gray-300">GST Certificate</span>
                </a>
                <a
                  href="/certificates/udyam-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-cta/50 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-cta" />
                  <span className="text-xs text-gray-300">Udyam Certificate</span>
                </a>
              </div>
            </div>

            {/* Quick Links Accordion */}
            <AccordionSection title="Quick Links" id="quick-links">
              <nav className="space-y-2" aria-label="Quick Links">
                {quickLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className="block text-gray-400 hover:text-white text-sm py-1.5 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </AccordionSection>

            {/* Products Accordion */}
            <AccordionSection title="Our Products" id="products">
              <nav className="space-y-2" aria-label="Products">
                {productLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className="block text-gray-400 hover:text-white text-sm py-1.5 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </AccordionSection>

            {/* Contact Accordion */}
            <AccordionSection title="Contact Us" id="contact">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cta mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">
                    Plot-4, Supreme Industrial Park 2, Vahelal - Dahegam Rd, Zak, Ahmedabad - 382330, India
                  </span>
                </div>
                <a href="tel:+917600444740" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-cta" />
                  <span className="text-sm">+91 76004 44740</span>
                </a>
                <a href="mailto:shivtechmachinery@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-cta" />
                  <span className="text-sm break-all">shivtechmachinery@gmail.com</span>
                </a>
              </div>
            </AccordionSection>

            {/* Mobile CTA Buttons */}
            <div className="mt-8 space-y-3">
              <a
                href="https://wa.me/917600444740"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: 'white'
                }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
              <Link 
                to="/contact"
                className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl font-semibold text-sm"
                style={{
                  background: 'linear-gradient(135deg, #C8862B 0%, #8F6020 100%)',
                  color: 'white'
                }}
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="border-t border-white/10 bg-black/20">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <p className="text-gray-500 text-sm text-center md:text-left">
                © {currentYear} <span className="text-gray-400">SHIV TECH</span>. All Rights Reserved.
              </p>
              
              {/* Legal Links */}
              <div className="flex items-center gap-4 text-sm">
                <Link 
                  to="/privacy-policy" 
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-700">|</span>
                <Link 
                  to="/terms" 
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </div>

              {/* Credits */}
              <p className="text-gray-600 text-xs text-center md:text-right">
                Designed & Developed by{" "}
                <a 
                  href="https://www.upgradexagency.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cta hover:text-cta transition-colors"
                >
                  Upgradex Agency
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
