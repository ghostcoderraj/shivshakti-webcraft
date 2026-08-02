import { HelmetProvider } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Phone, CheckCircle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SEOHead from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { getProductBySlug, getProductsByCategory } from "@/data/products";

interface ProductImage {
  url: string;
  alt?: string;
}

interface Specification {
  label: string;
  value: string;
}

interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

type DetailProduct = {
  id: string;
  name: string;
  slug: string;
  product_code: string;
  short_description: string;
  long_description: string;
  images: ProductImage[];
  key_benefits: string[];
  applications: string[];
  specifications: Specification[];
  category: ProductCategory | null;
};

const mapLocalProduct = (slug: string): DetailProduct | null => {
  const local = getProductBySlug(slug);
  if (!local) return null;
  return {
    id: local.id,
    name: local.name,
    slug: local.slug,
    product_code: local.model,
    short_description: local.shortDescription,
    long_description: local.longDescription,
    images: [{ url: local.image, alt: local.name }],
    key_benefits: local.features,
    applications: local.applications,
    specifications: local.specifications,
    category: {
      id: local.category,
      name: local.category,
      slug: local.category.toLowerCase().replace(/\s+/g, "-"),
    },
  };
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", slug],
    queryFn: async (): Promise<DetailProduct | null> => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          slug,
          product_code,
          short_description,
          long_description,
          images,
          key_benefits,
          applications,
          specifications,
          category:product_categories(id, name, slug)
        `)
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (!error && data) {
        return {
          ...data,
          product_code: data.product_code || "",
          short_description: data.short_description || "",
          long_description: data.long_description || "",
          images: (data.images as unknown as ProductImage[]) || [],
          key_benefits: (data.key_benefits as unknown as string[]) || [],
          applications: (data.applications as unknown as string[]) || [],
          specifications: (data.specifications as unknown as Specification[]) || [],
          category: data.category as ProductCategory | null,
        };
      }

      return slug ? mapLocalProduct(slug) : null;
    },
    enabled: !!slug,
  });

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["related-products", product?.category?.id, product?.slug],
    queryFn: async () => {
      if (!product?.category?.id) return [];

      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          slug,
          product_code,
          images,
          category:product_categories(id, name, slug)
        `)
        .eq("category_id", product.category.id)
        .eq("is_active", true)
        .neq("id", product.id)
        .limit(3);

      if (!error && data && data.length > 0) {
        return data.map((p) => ({
          ...p,
          images: (p.images as unknown as ProductImage[]) || [],
          category: p.category as ProductCategory | null,
        }));
      }

      return getProductsByCategory(product.category.name)
        .filter((p) => p.slug !== product.slug)
        .slice(0, 3)
        .map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          product_code: p.model,
          images: [{ url: p.image, alt: p.name }],
          category: product.category,
        }));
    },
    enabled: !!product?.category?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const productImage = product.images?.[0]?.url || "/placeholder.svg";
  const keyBenefits = product.key_benefits || [];
  const applications = product.applications || [];
  const specifications = product.specifications || [];
  const categoryName = product.category?.name || "Machinery";

  return (
    <HelmetProvider>
      <SEOHead
        title={`${product.name} | ${product.product_code || ""} | Manufacturer India`}
        description={`${product.short_description || ""}. Buy ${product.name} from SHIV TECH, leading plywood machinery manufacturer in Ahmedabad, India.`}
        keywords={`${product.name.toLowerCase()}, ${product.product_code || ""}, ${categoryName.toLowerCase()}, plywood machinery manufacturer India`}
        canonicalUrl={`/products/${slug}`}
        schemaType="Product"
        productData={{
          name: product.name,
          description: product.short_description || "",
          image: productImage,
          brand: "SHIV TECH",
        }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <section className="bg-secondary py-4">
            <div className="container mx-auto px-4">
              <nav className="text-sm text-muted-foreground">
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link to="/products" className="hover:text-primary">
                  Products
                </Link>
                <span className="mx-2">/</span>
                <span className="text-foreground">{product.name}</span>
              </nav>
            </div>
          </section>

          <section className="py-12 lg:py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="relative">
                  <img
                    src={productImage}
                    alt={`${product.name} - ${product.product_code || ""}`}
                    className="w-full rounded-xl shadow-lg bg-secondary/20 object-contain max-h-[520px]"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-cta text-cta-foreground text-sm font-medium rounded-full">
                    Made in India
                  </span>
                  {product.product_code && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                      {product.product_code}
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-sm text-muted-foreground uppercase tracking-wide">
                    {categoryName}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mt-2 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {product.long_description || product.short_description}
                  </p>

                  {keyBenefits.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-heading font-semibold text-lg mb-4">Key Features</h3>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {keyBenefits.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact">
                      <Button className="cta-button">
                        Request Quote
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <a href="tel:+919376102293">
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </Button>
                    </a>
                    <a
                      href="https://wa.me/919376102293"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="border-success text-success hover:bg-success hover:text-success-foreground"
                      >
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {specifications.length > 0 && (
            <section className="py-12 bg-secondary/30">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-center mb-8">Technical Specifications</h2>
                <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border overflow-hidden">
                  <Table>
                    <TableBody>
                      {specifications.map((spec, index) => (
                        <TableRow
                          key={index}
                          className={index % 2 === 0 ? "bg-secondary/50" : ""}
                        >
                          <TableCell className="font-medium text-foreground w-1/3">
                            {spec.label}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{spec.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>
          )}

          {applications.length > 0 && (
            <section className="py-12 bg-background">
              <div className="container mx-auto px-4">
                <h2 className="section-title mb-6">Applications</h2>
                <ul className="grid md:grid-cols-2 gap-3">
                  {applications.map((app, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-foreground">{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {relatedProducts.length > 0 && (
            <section className="py-12 bg-secondary/30">
              <div className="container mx-auto px-4">
                <h2 className="section-title text-center mb-8">Related Products</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedProducts.map((relProduct) => (
                    <Link
                      key={relProduct.id}
                      to={`/products/${relProduct.slug}`}
                      className="group card-industrial overflow-hidden"
                    >
                      <div className="relative h-40 overflow-hidden bg-secondary/30">
                        <img
                          src={relProduct.images?.[0]?.url || "/placeholder.svg"}
                          alt={relProduct.name}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4">
                        {relProduct.product_code && (
                          <span className="text-xs text-primary font-medium">
                            {relProduct.product_code}
                          </span>
                        )}
                        <h3 className="font-heading font-bold text-foreground mt-1 group-hover:text-primary transition-colors line-clamp-2">
                          {relProduct.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="py-16 bg-gradient-hero">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
                Interested in {product.name}?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Get the best price quote and technical specifications from our experts.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/contact">
                  <Button className="cta-button">
                    Get Best Price
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="mailto:shivtechmachinery@gmail.com">
                  <Button
                    variant="outline"
                    className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Email Enquiry
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
};

export default ProductDetail;
