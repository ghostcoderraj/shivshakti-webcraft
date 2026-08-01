import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const reasons = [
  "23+ years of manufacturing excellence since 2002",
  "ISO quality standards with rigorous testing protocols",
  "Competitive factory-direct pricing with no middlemen",
  "Pan-India service network with quick spare parts delivery",
  "Custom machinery solutions for unique requirements",
  "Export-ready products meeting international standards",
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Why Choose Us
            </span>
            <h2 className="section-title mb-6">
              Trusted Partner for{" "}
              <span className="gradient-text">Industrial Success</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              SHIV TECH has been at the forefront of plywood and woodworking 
              machinery manufacturing in India. Our commitment to quality, innovation, and 
              customer satisfaction sets us apart.
            </p>

            {/* Reasons List */}
            <motion.ul 
              className="space-y-4 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {reasons.map((reason, index) => (
                <motion.li
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-start gap-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/20 flex items-center justify-center mt-0.5 group-hover:bg-success group-hover:scale-110 transition-all duration-300">
                    <CheckCircle className="w-4 h-4 text-success group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-foreground">{reason}</span>
                </motion.li>
              ))}
            </motion.ul>

            <Link to="/why-choose-us">
              <Button variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold">
                Learn More About Us
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative perspective-1000">
              <motion.div 
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="glass-card-dark rounded-3xl p-8 lg:p-12 text-primary-foreground preserve-3d"
              >
                {/* Glow Effect */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-cta to-cta rounded-2xl rotate-12 opacity-90 shadow-2xl" />
                
                <div className="relative z-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                    className="text-7xl lg:text-9xl font-heading font-bold mb-4 tracking-tight"
                  >
                    23<span className="text-cta">+</span>
                  </motion.div>
                  <div className="text-2xl lg:text-3xl font-heading font-semibold mb-2">
                    Years of Excellence
                  </div>
                  <p className="text-primary-foreground/70 mb-8">
                    Established in 2002, serving industries across India and beyond
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "50000+", label: "Machines Installed" },
                      { value: "15+", label: "States Covered" },
                    ].map((stat, index) => (
                      <motion.div 
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10"
                      >
                        <div className="text-3xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary rounded-2xl -z-10 animate-pulse-slow" />
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-cta rounded-full animate-bounce-slow" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
