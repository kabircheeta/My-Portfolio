import { motion } from 'motion/react';
import { Code2, Palette, Zap, Globe } from 'lucide-react';

const skills = [
  { name: 'Frontend', icon: <Code2 size={24} />, description: 'React, Next.js, TypeScript, Tailwind CSS' },
  { name: 'Design', icon: <Palette size={24} />, description: 'UI/UX, Figma, Motion Graphics' },
  { name: 'Performance', icon: <Zap size={24} />, description: 'SEO, Core Web Vitals, Optimization' },
  { name: 'Scalability', icon: <Globe size={24} />, description: 'Cloud Infrastructure, Microservices' },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-apple-gray/30 dark:bg-apple-dark/50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
                About Me
              </h2>
              <div className="h-1 w-20 bg-apple-blue rounded-full" />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl font-light leading-relaxed opacity-80"
            >
              I am a passionate creative developer based in San Francisco, dedicated to 
              crafting seamless digital experiences. With over 5 years of experience 
              in the industry, I bridge the gap between design and technology.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl font-light leading-relaxed opacity-80"
            >
              My approach is rooted in minimalism and functionality. I believe that 
              every pixel should serve a purpose, and every interaction should feel 
              natural and intuitive.
            </motion.p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 rounded-2xl glass-card glass-highlight"
                >
                  <div className="text-apple-blue mb-4">{skill.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                  <p className="text-sm opacity-60 leading-relaxed">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group"
          >
            <img
              src="https://picsum.photos/seed/profile/800/800"
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-apple-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
