import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  schemaType?: "Organization" | "Product" | "WebPage" | "FAQPage";
  productData?: {
    name: string;
    description: string;
    image?: string;
    brand?: string;
  };
  faqData?: Array<{
    question: string;
    answer: string;
  }>;
}

const SEOHead = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  schemaType = "WebPage",
  productData,
  faqData,
}: SEOHeadProps) => {
  const baseUrl = "https://shivshaktiindiaplywood.com";
  const fullTitle = `${title} | SHIV TECH`;
  const fullUrl = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SHIV TECH",
    alternateName: "SSE India",
    url: baseUrl,
    logo: `${baseUrl}/logo.jpg`,
    description: "Leading manufacturer of plywood machinery and wood working equipment in India with 23+ years of experience.",
    foundingDate: "2002",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Survey No. 123, Industrial Area",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "382330",
      addressCountry: "IN"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-76004-44740",
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi", "Gujarati"]
    },
    sameAs: [
      "https://facebook.com/shivshaktiengineering",
      "https://linkedin.com/company/shivshaktiengineering"
    ]
  };

  const productSchema = productData ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productData.name,
    description: productData.description,
    image: productData.image,
    brand: {
      "@type": "Brand",
      name: productData.brand || "SHIV TECH"
    },
    manufacturer: {
      "@type": "Organization",
      name: "SHIV TECH"
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      seller: {
        "@type": "Organization",
        name: "SHIV TECH"
      }
    }
  } : null;

  const faqSchema = faqData ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="SHIV TECH" />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="SHIV TECH" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      {ogImage && <meta property="twitter:image" content={ogImage} />}

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Ahmedabad, Gujarat" />
      <meta name="geo.position" content="23.0225;72.5714" />
      <meta name="ICBM" content="23.0225, 72.5714" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      {productSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productSchema)}
        </script>
      )}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
