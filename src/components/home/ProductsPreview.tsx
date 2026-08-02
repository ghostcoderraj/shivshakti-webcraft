import { Link } from "react-router-dom";
import { ArrowRight, Eye, Loader2, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface FeaturedProduct {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  product_code: string | null;
  images: { url: string; alt?: string }[] | null;
  category: { name: string; slug: string } | null;
}

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

const getProductImage = (product: FeaturedProduct): string => {
  if (product.images && Array.isArray(product.images) && product.images[0]?.url) {
    return product.images[0].url;
  }
  return "/placeholder.svg";
};

const ProductsPreview = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          slug,
          short_description,
          product_code,
          images,
          category:product_categories(name, slug)
        `)
        .eq("is_featured", true)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return (data || []).map((p) => ({
        ...p,
        images: (p.images as FeaturedProduct["images"]) || [],
        category: p.category as FeaturedProduct["category"],
      })) as FeaturedProduct[];
    },
  });

  return (
    <section className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            Featured Products
          </span>
          <h2 className="section-title mb-4">
            Plywood & Wood Working Machinery
          </h2>
          <p className="section-subtitle mx-auto">
            Highlighted machines from our catalog — the same products starred as Featured
            in the admin panel.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading featured products...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 mb-8">
            <p className="text-muted-foreground mb-2">
              No featured products yet.
            </p>
            <p className="text-sm text-muted-foreground">
              Star products as Featured in Admin → Products to show them here.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link
                  to={`/products/${product.slug}`}
                  className="block card-industrial overflow-hidden h-full"
                >
                  <div className="relative h-64 overflow-hidden bg-secondary/30">
                    <motion.img
                      src={getProductImage(product)}
                      alt={`${product.name} - SHIV TECH`}
                      className="w-full h-full object-contain p-3"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-primary font-medium rounded-full">
                        <Eye className="w-4 h-4" />
                        View Details
                      </span>
                    </div>

                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cta to-cta text-white text-xs font-semibold rounded-full shadow-lg">
                      <Star className="w-3 h-3 fill-white" />
                      Featured
                    </span>

                    {product.product_code && (
                      <span className="absolute top-4 right-4 px-2 py-1 bg-primary/90 text-primary-foreground text-[11px] font-medium rounded">
                        {product.product_code}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    {product.category?.name && (
                      <span className="text-xs uppercase tracking-wide text-muted-foreground">
                        {product.category.name}
                      </span>
                    )}
                    <h3 className="font-heading font-bold text-xl text-foreground mb-2 mt-1 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-2">
                      {product.short_description ||
                        "Quality industrial machinery for wood processing."}
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
        )}

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
