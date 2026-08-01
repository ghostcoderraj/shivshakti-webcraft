import shivTechLogo from "@/assets/shivtech-logo.png.asset.json";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const productCategories = [
  { name: "Band Saw Blade Grinder", slug: "band-saw-blade-grinder" },
  { name: "Teeth Setting Machine", slug: "teeth-setting-machine" },
  { name: "Rip Saw Machines", slug: "rip-saw-machines" },
  { name: "Finger Jointing Machines", slug: "finger-jointing-machines" },
  { name: "Glue Spreader Machines", slug: "glue-spreader-machines" },
  { name: "Belt Sander Machines", slug: "belt-sander-machines" },
  { name: "Dust Collector Systems", slug: "dust-collector-systems" },
  { name: "D.D. Saw Machines", slug: "dd-saw-machines" },
  { name: "Panel & Door Assembler", slug: "panel-door-assembler" },
  { name: "Wood Drying Chamber", slug: "wood-drying-chamber" },
  { name: "Edge Cutting Machines", slug: "edge-cutting-machines" },
  { name: "Calibration Sanding Machines", slug: "calibration-sanding-machines" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products", hasDropdown: true },
    { name: "Why Choose Us", path: "/why-choose-us" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary via-primary/95 to-primary text-primary-foreground py-2.5">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4 md:gap-6">
            <a href="tel:+917600444740" className="flex items-center gap-2 hover:text-cta transition-colors">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="hidden sm:inline font-medium">+91 76004 44740</span>
            </a>
            <a href="mailto:shivtechmachinery@gmail.com" className="flex items-center gap-2 hover:text-cta transition-colors">
              <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="hidden md:inline font-medium">shivtechmachinery@gmail.com</span>
            </a>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium">
              <Sparkles className="w-3 h-3 text-cta" />
              23+ Years Experience
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium">
              🇮🇳 Made in India
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden"
              >
                <img src={shivTechLogo.url} alt="SHIV TECH Logo" className="w-full h-full object-contain" />
              </motion.div>
              <div>
                <h1 className="font-heading font-bold text-xs sm:text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
                  SHIV TECH
                </h1>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  {link.hasDropdown ? (
                    <button
                      className={`flex items-center gap-1 font-medium transition-colors py-2 ${
                        isActive(link.path) ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${isProductsOpen ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      to={link.path}
                      className={`relative font-medium transition-colors py-2 ${
                        isActive(link.path) ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                    >
                      {link.name}
                      {isActive(link.path) && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        />
                      )}
                    </Link>
                  )}

                  {/* Products Dropdown */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {isProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-72 bg-card/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl py-2 mt-1"
                          onMouseEnter={() => setIsProductsOpen(true)}
                          onMouseLeave={() => setIsProductsOpen(false)}
                        >
                          <Link
                            to="/products"
                            className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-accent/50 transition-colors"
                          >
                            View All Products →
                          </Link>
                          <div className="border-t border-border/50 my-1" />
                          <div className="max-h-80 overflow-y-auto">
                            {productCategories.map((category) => (
                              <Link
                                key={category.slug}
                                to={`/products/${category.slug}`}
                                className="block px-4 py-2 text-sm text-foreground hover:bg-accent/50 hover:text-primary transition-colors"
                              >
                                {category.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link to="/contact">
                <Button className="cta-button">Get Quote</Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 text-foreground rounded-lg hover:bg-accent/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden mt-4 py-4 border-t border-border/50 overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.div 
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link.hasDropdown ? (
                        <>
                          <Link
                            to={link.path}
                            className={`block font-medium py-3 px-4 rounded-lg ${
                              isActive(link.path) ? "text-primary bg-primary/10" : "text-foreground hover:bg-accent/50"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.name}
                          </Link>
                          <div className="ml-4 space-y-1 mt-1">
                            {productCategories.slice(0, 6).map((category) => (
                              <Link
                                key={category.slug}
                                to={`/products/${category.slug}`}
                                className="block text-sm text-muted-foreground py-2 px-4 hover:text-primary rounded-lg hover:bg-accent/30"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {category.name}
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        <Link
                          to={link.path}
                          className={`block font-medium py-3 px-4 rounded-lg ${
                            isActive(link.path) ? "text-primary bg-primary/10" : "text-foreground hover:bg-accent/50"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.1 }}
                  >
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                      <Button className="cta-button w-full mt-4">Get Quote</Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};

export default Header;
