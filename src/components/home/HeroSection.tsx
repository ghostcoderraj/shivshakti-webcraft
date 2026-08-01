import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Sparkles, Award } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-machinery.jpg";
import { useEffect, useState } from "react";

// Check if device is low-end
const useIsLowEndDevice = () => {
  const [isLowEnd, setIsLowEnd] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference or low-end indicators
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const isMobile = window.innerWidth < 768;
    const hasLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
    
    setIsLowEnd(mediaQuery.matches || hasLowMemory || false);
  }, []);
  
  return isLowEnd;
};

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const isLowEnd = useIsLowEndDevice();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Disable heavy animations on low-end devices or reduced motion
  const shouldReduceMotion = prefersReducedMotion || isLowEnd;
  const animationDuration = shouldReduceMotion ? 0.3 : 1.8;

  // Parallax layer configurations
  const parallaxConfig = {
    background: { x: shouldReduceMotion ? 0 : 30, scale: shouldReduceMotion ? 1 : 1.15 },
    midground: { x: shouldReduceMotion ? 0 : 15, scale: shouldReduceMotion ? 1 : 1.08 },
    foreground: { x: shouldReduceMotion ? 0 : 0, scale: shouldReduceMotion ? 1 : 1 },
  };

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#2B1D14]">
      {/* ============ PARALLAX BACKGROUND LAYERS ============ */}
      
      {/* Deep Background Layer - Slowest movement */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ 
          scale: 1.3, 
          x: -50,
          opacity: 0 
        }}
        animate={{ 
          scale: parallaxConfig.background.scale, 
          x: parallaxConfig.background.x,
          opacity: 1 
        }}
        transition={{ 
          duration: animationDuration, 
          ease: [0.25, 0.1, 0.25, 1] 
        }}
      >
        {/* Industrial gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3A2718] via-[#2B1D14] to-[#1C120B]" />
        
        {/* Subtle grid pattern for industrial feel */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </motion.div>

      {/* Mid Background - Hero Image with 3D Depth */}
      <motion.div 
        className="absolute inset-0 z-10"
        initial={{ 
          scale: 1.25, 
          x: -40,
          rotateY: isMobile ? 0 : -3,
          opacity: 0,
          z: -100
        }}
        animate={{ 
          scale: parallaxConfig.midground.scale, 
          x: parallaxConfig.midground.x,
          rotateY: 0,
          opacity: 1,
          z: 0
        }}
        transition={{ 
          duration: animationDuration, 
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.1
        }}
        style={{ 
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <img
          src={heroImage}
          alt="Industrial plywood machinery manufacturing facility in Ahmedabad, India"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        
        {/* Light reflection overlay - subtle industrial lighting */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{
            background: `
              linear-gradient(
                135deg,
                rgba(59,130,246,0.03) 0%,
                transparent 50%,
                transparent 100%
              )
            `
          }}
        />
        
        {/* Depth overlay - creates 3D depth perception */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to right,
                rgba(10,22,40,0.95) 0%,
                rgba(10,22,40,0.7) 35%,
                rgba(10,22,40,0.5) 60%,
                rgba(10,22,40,0.4) 100%
              )
            `
          }}
        />
      </motion.div>

      {/* Ambient Light Effects - Subtle industrial glow */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] z-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 2, delay: 0.8 }}
      >
        <div className="w-full h-full rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl" />
      </motion.div>

      {/* Steel reflection accent */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1/3 z-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <div className="w-full h-full bg-gradient-to-t from-[#2B1D14] via-transparent to-transparent" />
      </motion.div>

      {/* ============ CONTENT LAYER ============ */}
      <div className="container mx-auto px-4 py-20 relative z-30">
        <div className="max-w-3xl">
          
          {/* Trust Badges - 3D Rotation Entry */}
          <motion.div 
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 30, rotateX: isMobile ? 0 : -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              duration: animationDuration * 0.6, 
              delay: shouldReduceMotion ? 0 : 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{ perspective: '500px' }}
          >
            {/* Experience Badge with subtle 3D rotation */}
            <motion.span 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
              initial={{ rotateY: isMobile ? 0 : -5, rotateX: isMobile ? 0 : 5 }}
              animate={{ rotateY: 0, rotateX: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: shouldReduceMotion ? 0 : 0.8,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              whileHover={{ 
                rotateY: isMobile ? 0 : 3, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <Award className="w-4 h-4 text-cta" />
              23+ Years of Excellence
            </motion.span>
            
            <motion.span 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border backdrop-blur-md"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
              initial={{ rotateY: isMobile ? 0 : 5, rotateX: isMobile ? 0 : 5 }}
              animate={{ rotateY: 0, rotateX: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: shouldReduceMotion ? 0 : 0.9,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              🇮🇳 Made in India
            </motion.span>
          </motion.div>

          {/* Main Heading - 3D Lift Animation */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.1] mb-6"
            style={{ 
              color: 'white',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)'
            }}
            initial={{ 
              opacity: 0, 
              y: 60, 
              z: -50,
              rotateX: isMobile ? 0 : 10
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              z: 0,
              rotateX: 0
            }}
            transition={{ 
              duration: animationDuration * 0.7, 
              delay: shouldReduceMotion ? 0 : 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <motion.span 
              className="block"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: shouldReduceMotion ? 0 : 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              Leading Plywood Machinery
            </motion.span>
            <motion.span 
              className="relative inline-block mt-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: shouldReduceMotion ? 0 : 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <span 
                className="relative z-10"
                style={{
                  background: 'linear-gradient(135deg, #C8862B 0%, #D89A45 50%, #E8BE84 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Manufacturer
              </span>
              {/* Subtle glow behind text */}
              <motion.span 
                className="absolute inset-0 blur-2xl -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1.5, delay: 1 }}
                style={{
                  background: 'linear-gradient(135deg, #C8862B 0%, #D89A45 100%)',
                }}
              />
            </motion.span>
            <motion.span 
              className="block mt-2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: shouldReduceMotion ? 0 : 0.6,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              in India
            </motion.span>
          </motion.h1>

          {/* Subheading - Fade with depth */}
          <motion.p 
            className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl"
            style={{ color: 'rgba(255,255,255,0.75)' }}
            initial={{ 
              opacity: 0, 
              y: 40,
              filter: 'blur(4px)'
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              filter: 'blur(0px)'
            }}
            transition={{ 
              duration: animationDuration * 0.6, 
              delay: shouldReduceMotion ? 0 : 0.7,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            Trusted by 500+ plywood manufacturers, saw mills, and wood processing industries. 
            We deliver innovative, durable, and efficient woodworking machinery that maximizes your production capacity.
          </motion.p>

          {/* Key Benefits - Staggered reveal with subtle lift */}
          <motion.ul 
            className="flex flex-wrap gap-x-6 gap-y-3 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: shouldReduceMotion ? 0 : 0.9 }}
          >
            {["Industry-Leading Quality", "Competitive Prices", "Pan-India Support", "Export Ready"].map((benefit, index) => (
              <motion.li 
                key={benefit} 
                className="flex items-center gap-2"
                style={{ color: 'rgba(255,255,255,0.85)' }}
                initial={{ 
                  opacity: 0, 
                  y: 20,
                  x: -10
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  x: 0
                }}
                transition={{ 
                  duration: 0.5, 
                  delay: shouldReduceMotion ? 0 : 1 + index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              >
                <CheckCircle className="w-5 h-5 text-cta" />
                <span className="font-medium">{benefit}</span>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA Buttons - Rise with depth shadow */}
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: animationDuration * 0.6, 
              delay: shouldReduceMotion ? 0 : 1.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <Link to="/contact">
              <motion.div
                initial={{ 
                  boxShadow: '0 0 0 rgba(249,115,22,0)'
                }}
                animate={{ 
                  boxShadow: '0 20px 50px -15px rgba(249,115,22,0.4)'
                }}
                transition={{ 
                  duration: 1, 
                  delay: shouldReduceMotion ? 0 : 1.4
                }}
                whileHover={{ 
                  y: -3,
                  boxShadow: '0 25px 60px -15px rgba(249,115,22,0.5)',
                  transition: { duration: 0.3 }
                }}
                className="rounded-xl"
              >
                <Button 
                  className="text-base px-8 py-6 font-semibold rounded-xl border-0"
                  style={{
                    background: 'linear-gradient(135deg, #C8862B 0%, #8F6020 100%)',
                    color: 'white',
                  }}
                >
                  Request a Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </Link>
            
            <Link to="/products">
              <motion.div
                whileHover={{ 
                  y: -2,
                  transition: { duration: 0.3 }
                }}
              >
                <Button 
                  variant="outline" 
                  className="text-base px-8 py-6 font-semibold rounded-xl backdrop-blur-sm"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderColor: 'rgba(255,255,255,0.25)',
                    color: 'white',
                  }}
                >
                  View Products
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
