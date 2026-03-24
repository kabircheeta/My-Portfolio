import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,204,0.05),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(0,102,204,0.1),transparent_70%)]" />
      
      {/* Floating Glass Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 md:left-20 w-32 h-32 md:w-48 md:h-48 glass-card rounded-3xl -z-10 hidden sm:block"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-10 md:right-20 w-24 h-24 md:w-40 md:h-40 glass-card rounded-full -z-10 hidden sm:block"
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6 max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-sm md:text-base font-medium tracking-[0.2em] uppercase"
        >
          Creative Developer & Designer
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-8xl font-display font-bold tracking-tight leading-[1.1]"
        >
          Crafting digital <br />
          <span className="text-apple-blue">experiences</span> with intent.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-apple-dark dark:bg-apple-gray text-white dark:text-apple-dark rounded-full font-medium hover:scale-105 transition-transform"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border border-apple-dark/10 dark:border-apple-gray/10 rounded-full font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
