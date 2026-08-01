import { motion } from "framer-motion";
import { Award, Factory, Users, Globe, Shield, Wrench, Zap } from "lucide-react";

const stats = [
  { icon: Award, value: "23+", label: "Years Experience", description: "Since 2002", color: "from-primary to-primary" },
  { icon: Factory, value: "50000+", label: "Machines Installed", description: "Pan India", color: "from-cta to-cta" },
  { icon: Users, value: "50000+", label: "Happy Clients", description: "Worldwide", color: "from-emerald-500 to-emerald-600" },
  { icon: Globe, value: "15+", label: "States Served", description: "In India", color: "from-purple-500 to-purple-600" },
];

const features = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Every machine undergoes rigorous testing before delivery to ensure peak performance.",
  },
  {
    icon: Zap,
    title: "Modern Manufacturing",
    description: "State-of-the-art facility with latest CNC machines and precision tools.",
  },
  {
    icon: Wrench,
    title: "Lifetime Support",
    description: "Dedicated after-sales support with spare parts availability across India.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const TrustSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-premium industrial-section relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cta/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative group"
            >
              <div className="glass-card rounded-2xl p-6 lg:p-8 text-center h-full glow-effect">
                {/* Icon with gradient background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Value */}
                <motion.div 
                  className="text-4xl lg:text-5xl font-heading font-bold gradient-text mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="flex gap-5 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cta/20 to-cta/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-cta" />
                </div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
