import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import bandSawImage from "@/assets/products/auto-band-saw-grinder-new.png";
import fingerJointingImage from "@/assets/products/manual-finger-jointer.png";
import glueSpreaderImage from "@/assets/products/deluxe-glue-spreader.jpg";
import autoBandSawImage from "@/assets/products/auto-band-saw-grinder.png";
import dryingChamberImage from "@/assets/products/wood-drying-chamber-facelist.png";

const productCategories = [
  {
    name: "Automatic Band Saw Blade Grinder",
    slug: "band-saw-blade-grinder",
    image: bandSawImage,
    description: "Precision automatic grinding for sharp, consistent blade edges.",
    tag: "Best Seller",
  },
  {
    name: "Finger Jointing Machines",
    slug: "finger-jointing-machines",
    image: fingerJointingImage,
    description: "High-speed finger forming and jointing for wood panel production.",
    tag: "Popular",
  },
  {
    name: "Glue Spreader Machines",
    slug: "glue-spreader-machines",
    image: glueSpreaderImage,
    description: "Uniform adhesive application for plywood and lamination.",
  },
  {
    name: "Automatic Teeth Setting Machine",
    slug: "automatic-teeth-setting-machine",
    image: autoBandSawImage,
    description: "Fully automatic precision grinding for consistent, sharp blade edges.",
  },
  {
    name: "Wood Drying Chamber",
    slug: "wood-drying-chamber",
    image: dryingChamberImage,
    description: "Advanced kiln drying for optimal moisture control.",
    tag: "Industrial",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const ProductsPreview = () => {
  return (
    <section className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Our Products
          </span>
          <h2 className="section-title mb-4">
            Plywood & Wood Working Machinery
          </h2>
          <p className="section-subtitle mx-auto">
            Comprehensive range of industrial machinery designed for maximum efficiency, 
            durability, and precision in wood processing operations.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {productCategories.map((product, index) => (
            <motion.div
              key={product.slug}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link
                to={`/products/${product.slug}`}
                className="block card-industrial overflow-hidden h-full"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={`${product.name} - Plywood machinery by SHIV TECH`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Quick View Button */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-primary font-medium rounded-full">
                      <Eye className="w-4 h-4" />
                      View Details
                    </span>
                  </motion.div>

                  {/* Tag */}
                  {product.tag && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-cta to-cta text-white text-xs font-semibold rounded-full shadow-lg">
                      {product.tag}
                    </span>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <span className="inline-flex items-center text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                    Explore Machine
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link to="/products">
            <Button 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-base font-semibold transition-all duration-300"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsPreview;
