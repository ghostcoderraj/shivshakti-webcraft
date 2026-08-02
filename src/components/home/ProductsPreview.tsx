import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { products, productCategories, type Product } from "@/data/products";

const FEATURED_TAGS: Record<string, string> = {
  "automatic-band-saw-blade-grinder": "Best Seller",
  "auto-finger-forming-plc": "Popular",
  "deluxe-glue-spreader": "Top Pick",
  "wood-drying-chamber": "Industrial",
  "heavy-rip-saw": "Heavy Duty",
  "dust-collector": "Essential",
};

const HOME_LIMIT = 12;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const ProductsPreview = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const present = productCategories.filter((cat) =>
      products.some((p) => p.category === cat)
    );
    return ["All", ...present];
  }, []);

  const filtered = useMemo(() => {
    const list =
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory);
    return list.slice(0, HOME_LIMIT);
  }, [activeCategory]);

  const totalInCategory =
    activeCategory === "All"
      ? products.length
      : products.filter((p) => p.category === activeCategory).length;

  return (
    <section className="py-20 lg:py-28 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-12"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Our Products
          </span>
          <h2 className="section-title mb-4">
            Plywood & Wood Working Machinery
          </h2>
          <p className="section-subtitle mx-auto">
            Explore our full industrial range — {products.length}+ machines built for
            saw mills, plywood plants, and wood working units.
          </p>
        </motion.div>

        {/* Category filters from products catalog */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => {
            const active = activeCategory === cat;
            const count =
              cat === "All"
                ? products.length
                : products.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card/80 text-foreground border-border hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
                <span className={`ml-1.5 text-xs ${active ? "opacity-80" : "text-muted-foreground"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        <div className="flex items-end justify-between mb-6 px-1">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span>
            {totalInCategory > filtered.length ? ` of ${totalInCategory}` : ""}{" "}
            machines
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          </p>
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center text-sm font-semibold text-primary hover:gap-2 transition-all"
          >
            Full catalog
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6 mb-12"
          >
            {filtered.map((product: Product) => {
              const tag = FEATURED_TAGS[product.slug];
              return (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link
                    to={`/products/${product.slug}`}
                    className="block card-industrial overflow-hidden h-full bg-card"
                  >
                    <div className="relative h-48 overflow-hidden bg-secondary/40">
                      <motion.img
                        src={product.image}
                        alt={`${product.name} - SHIV TECH`}
                        className="w-full h-full object-contain p-3"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/95 text-primary text-sm font-medium rounded-full shadow">
                          <Eye className="w-4 h-4" />
                          View Details
                        </span>
                      </div>
                      <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-[11px] font-semibold rounded tracking-wide">
                        {product.model}
                      </span>
                      {tag && (
                        <span className="absolute top-3 right-3 px-2.5 py-1 bg-cta text-white text-[11px] font-semibold rounded-full shadow">
                          {tag}
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                        {product.category}
                      </span>
                      <h3 className="font-heading font-bold text-base text-foreground mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 leading-relaxed line-clamp-2">
                        {product.shortDescription}
                      </p>
                      <span className="inline-flex items-center text-primary font-semibold text-sm">
                        Explore Machine
                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/products">
            <Button
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-base font-semibold"
            >
              View All {products.length} Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsPreview;
