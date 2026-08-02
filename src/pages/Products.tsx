import { useState, useMemo } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Filter, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SEOHead from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  product_code: string;
  images: { url: string; alt: string }[] | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  key_benefits: string[] | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Fetch products from database
  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
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
          key_benefits,
          category:product_categories(id, name, slug)
        `)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data as Product[];
    },
  });

  // Fetch categories from database
  const { data: categories = [] } = useQuery({
    queryKey: ["product_categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_categories")
        .select("id, name, slug")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      
      if (error) throw error;
      return data as Category[];
    },
  });

  // Get categories with product counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      count: products.filter((p) => p.category?.id === cat.id).length,
    }));
  }, [categories, products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter((p) => p.category?.name === selectedCategory);
  }, [selectedCategory, products]);

  const totalProducts = products.length;

  // Helper to get first image URL
  const getProductImage = (product: Product): string => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0].url || "/placeholder.svg";
    }
    return "/placeholder.svg";
  };

  // Helper to get features/benefits
  const getProductFeatures = (product: Product): string[] => {
    if (product.key_benefits && Array.isArray(product.key_benefits)) {
      return product.key_benefits.slice(0, 2);
    }
    return [];
  };

  return (
    <HelmetProvider>
      <SEOHead
        title="Plywood & Wood Working Machinery Products"
        description="Complete range of plywood machinery and wood working equipment. Band saw grinders, finger jointing machines, glue spreaders, belt sanders, drying chambers & more from SHIV TECH."
        keywords="plywood machinery products, wood working machines, band saw blade grinder, finger jointing machine, glue spreader, belt sander, wood drying chamber, industrial woodworking machines"
        canonicalUrl="/products"
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {/* Page Header */}
          <section className="bg-gradient-hero py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <nav className="text-primary-foreground/60 text-sm mb-4">
                  <Link to="/" className="hover:text-primary-foreground">Home</Link>
                  <span className="mx-2">/</span>
                  <span className="text-primary-foreground">Products</span>
                </nav>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
                  Our Machinery Products
                </h1>
                <p className="text-lg text-primary-foreground/80">
                  Comprehensive range of {totalProducts}+ industrial machinery designed for maximum efficiency, 
                  durability, and precision in plywood and wood processing operations.
                </p>
              </div>
            </div>
          </section>

          {/* Category Filter */}
          <section className="py-6 bg-secondary/50 border-b border-border sticky top-16 z-40">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter:</span>
                </div>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground hover:bg-primary/10 border border-border"
                  }`}
                >
                  All Products ({totalProducts})
                </button>
                {categoriesWithCounts.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat.name
                        ? "bg-primary text-primary-foreground"
                        : "bg-background text-foreground hover:bg-primary/10 border border-border"
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Products Grid */}
          <section className="py-12 lg:py-16 bg-background">
            <div className="container mx-auto px-4">
              {selectedCategory !== "All" && (
                <div className="mb-8">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    {selectedCategory}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    Showing {filteredProducts.length} products
                  </p>
                </div>
              )}

              {productsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <span className="ml-2 text-muted-foreground">Loading products...</span>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, index) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.slug}`}
                      className="group card-industrial overflow-hidden animate-fade-in"
                      style={{ animationDelay: `${(index % 8) * 0.05}s` }}
                    >
                      <div className="relative h-48 overflow-hidden bg-secondary/30">
                        <img
                          src={getProductImage(product)}
                          alt={`${product.name} - ${product.product_code || ''}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        {product.product_code && (
                          <span className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded">
                            {product.product_code}
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">
                          {product.category?.name || "Uncategorized"}
                        </span>
                        <h3 className="font-heading font-bold text-base text-foreground mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed line-clamp-2">
                          {product.short_description || "Quality industrial machinery for wood processing."}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {getProductFeatures(product).map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-secondary/50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="section-title mb-4">Need Custom Machinery?</h2>
              <p className="section-subtitle mx-auto mb-8">
                We can design and manufacture custom machinery solutions for your specific requirements.
              </p>
              <Link to="/contact">
                <Button className="cta-button">
                  Contact Our Experts
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
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

export default Products;
