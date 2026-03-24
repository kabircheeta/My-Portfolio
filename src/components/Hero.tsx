import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { DynamicBackground } from './DynamicBackground';
import { Magnetic } from './Magnetic';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse tracking for subtle parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 50);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 50);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <DynamicBackground />
      
      {/* Floating Glass Elements with Mouse Parallax */}
      <motion.div
        style={{ y: y1, x: springX, rotate: useTransform(springX, [-25, 25], [-5, 5]) }}
        animate={{
          rotate: [0, 5, 0],
        }}
        transition={{
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
        className="absolute top-1/4 left-10 md:left-20 w-32 h-32 md:w-48 md:h-48 glass-card rounded-3xl -z-10 hidden sm:block"
      />
      <motion.div
        style={{ y: y2, x: useTransform(springX, (v) => -v), rotate: useTransform(springX, [-25, 25], [5, -5]) }}
        animate={{
          rotate: [0, -5, 0],
        }}
        transition={{
          rotate: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
        className="absolute bottom-1/4 right-10 md:right-20 w-24 h-24 md:w-40 md:h-40 glass-card rounded-full -z-10 hidden sm:block"
      />
      
      <motion.div
        style={{ opacity }}
        className="space-y-6 max-w-4xl relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block px-4 py-1.5 rounded-full border border-apple-blue/20 bg-apple-blue/5 text-apple-blue text-xs md:text-sm font-medium tracking-[0.2em] uppercase"
        >
          Creative Developer & Designer
        </motion.div>
        
        <div className="overflow-hidden">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-display font-bold tracking-tight leading-[1.1]"
          >
            Crafting digital <br />
            <span className="text-apple-blue inline-block hover:scale-105 transition-transform cursor-default">experiences</span> with intent.
          </motion.h1>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Specializing in building high-performance, visually stunning web applications 
          that blend aesthetics with functionality.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
        >
          <Magnetic strength={0.2}>
            <a
              href="#projects"
              className="px-10 py-4 bg-apple-dark dark:bg-apple-gray text-white dark:text-apple-dark rounded-full font-medium hover:shadow-xl transition-all"
            >
              View My Work
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              className="px-10 py-4 border border-apple-dark/10 dark:border-apple-gray/10 rounded-full font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Get in Touch
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
