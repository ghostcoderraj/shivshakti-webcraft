import { HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Award, Users, Factory, Target, Sparkles, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import SEOHead from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import Hero3DScene from "@/components/3d/Hero3DScene";

const milestones = [
  { year: "2002", event: "Company established in Ahmedabad, Gujarat", icon: "🏭" },
  { year: "2005", event: "Launched first automatic blade grinder", icon: "⚙️" },
  { year: "2010", event: "Expanded to serve 10+ states in India", icon: "🗺️" },
  { year: "2015", event: "Started exporting to international markets", icon: "🌍" },
  { year: "2020", event: "Crossed 400+ machines delivered milestone", icon: "🎯" },
  { year: "2025", event: "Continuing innovation with 23+ years legacy", icon: "🚀" },
];

const values = [
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Every machine undergoes rigorous quality checks before delivery.",
    color: "from-primary to-primary",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "We prioritize customer satisfaction with dedicated support.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Factory,
    title: "Innovation",
    description: "Continuous R&D to bring latest technology to our machinery.",
    color: "from-cta to-cta",
  },
  {
    icon: Target,
    title: "Reliability",
    description: "Built to last with durable components and robust construction.",
    color: "from-purple-500 to-purple-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  return (
    <HelmetProvider>
      <SEOHead
        title="About Us - Plywood Machinery Manufacturer Since 2002"
        description="SHIV TECH - Leading plywood and wood working machinery manufacturer since 2002. 23+ years of excellence serving industries across India and worldwide."
        keywords="about shiv shakti engineering, plywood machinery company, wood working machinery manufacturer ahmedabad, industrial machinery india"
        canonicalUrl="/about"
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {/* Hero with 3D */}
          <section className="relative min-h-[60vh] flex items-center bg-gradient-hero overflow-hidden">
            <Hero3DScene className="opacity-40" />
            
            {/* Animated Orbs */}
            <motion.div 
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-20 left-[10%] w-64 h-64 bg-primary/20 rounded-full blur-3xl"
            />
            <motion.div 
              animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute bottom-20 right-[10%] w-80 h-80 bg-cta/15 rounded-full blur-3xl"
            />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.nav 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-primary-foreground/60 text-sm mb-4"
              >
                <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-primary-foreground">About Us</span>
              </motion.nav>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-primary-foreground text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4 text-cta" />
                  Our Story
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-foreground mb-6">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cta to-cta">SHIV TECH</span> ENGINEERING INDIA
                </h1>
                <p className="text-xl text-primary-foreground/80 max-w-2xl">
                  23+ years of manufacturing excellence, serving plywood and wood processing 
                  industries across India and beyond.
                </p>
              </motion.div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
          </section>

          {/* Story Section */}
          <section className="py-20 lg:py-32 bg-gradient-premium industrial-section relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                    <Sparkles className="w-4 h-4" />
                    Our Journey
                  </span>
                  <h2 className="section-title mb-6">
                    From Ahmedabad to{" "}
                    <span className="gradient-text">Across the Globe</span>
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Established in 2002, SHIV TECH began its journey in 
                      Ahmedabad, Gujarat with a vision to provide world-class plywood and wood 
                      working machinery to Indian industries.
                    </p>
                    <p>
                      Over the past two decades, we have grown from a small workshop to a 
                      full-fledged manufacturing facility, delivering over 50000+ machines to 
                      satisfied customers across 15+ states in India.
                    </p>
                    <p>
                      Today, we are proud to export our machinery to international markets 
                      including Bangladesh, Nepal, Sri Lanka, and African nations, while 
                      maintaining our commitment to quality and customer satisfaction.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="perspective-1000"
                >
                  <motion.div 
                    whileHover={{ rotateY: 5, rotateX: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="glass-card-dark rounded-3xl p-8 lg:p-12 text-primary-foreground preserve-3d"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                      className="text-7xl lg:text-9xl font-heading font-bold mb-4"
                    >
                      23<span className="text-cta">+</span>
                    </motion.div>
                    <div className="text-2xl font-heading font-semibold mb-4">Years of Trust</div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      {[
                        { value: "50000+", label: "Machines Delivered" },
                        { value: "50000+", label: "Happy Clients" },
                        { value: "15+", label: "States Served" },
                        { value: "5+", label: "Countries Export" },
                      ].map((stat, index) => (
                        <motion.div
                          key={stat.label}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
                        >
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-xs text-primary-foreground/60">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="py-20 lg:py-32 bg-secondary/30 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cta/5 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  Timeline
                </span>
                <h2 className="section-title mb-4">Our Journey Through the Years</h2>
                <p className="section-subtitle mx-auto">
                  Key milestones in our 23+ years of manufacturing excellence
                </p>
              </motion.div>
              
              <div className="max-w-4xl mx-auto">
                {milestones.map((milestone, index) => (
                  <motion.div 
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6 mb-8 last:mb-0"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-primary-foreground font-bold shadow-lg"
                      >
                        <span className="text-2xl">{milestone.icon}</span>
                      </motion.div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-gradient-to-b from-primary to-transparent mt-2" />
                      )}
                    </div>
                    <div className="pt-2 flex-1">
                      <div className="text-sm text-primary font-semibold mb-1">{milestone.year}</div>
                      <p className="text-foreground font-medium text-lg">{milestone.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
            
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                  Our Values
                </span>
                <h2 className="section-title mb-4">Our Core Values</h2>
                <p className="section-subtitle mx-auto">
                  The principles that guide our work and relationships
                </p>
              </motion.div>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="glass-card text-center p-8 rounded-2xl glow-effect"
                  >
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} mb-6 shadow-lg`}>
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-hero relative overflow-hidden">
            <motion.div 
              animate={{ x: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-20 left-[10%] w-64 h-64 bg-primary/20 rounded-full blur-3xl"
            />
            
            <div className="container mx-auto px-4 text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
                  Ready to Partner with Us?
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Join 50000+ satisfied customers who trust SHIV TECH for their machinery needs.
                </p>
                <Link to="/contact">
                  <Button className="cta-button text-lg px-10 py-7">
                    Contact Us Today
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
};

export default About;
