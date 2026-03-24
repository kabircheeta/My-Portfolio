import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Senior Frontend Engineer',
    company: 'TechFlow Solutions',
    period: '2022 - Present',
    description: 'Leading the frontend development of a high-traffic SaaS platform, focusing on performance and user experience.',
    icon: <Briefcase size={20} />,
  },
  {
    title: 'UI/UX Designer',
    company: 'Creative Pulse',
    period: '2020 - 2022',
    description: 'Designed and developed interactive web experiences for global brands, ensuring consistent visual identity.',
    icon: <Palette size={20} />,
  },
  {
    title: 'Full Stack Developer',
    company: 'StartUp Hub',
    period: '2018 - 2020',
    description: 'Built and maintained scalable web applications using React, Node.js, and PostgreSQL.',
    icon: <Code2 size={20} />,
  },
  {
    title: 'B.S. Computer Science',
    company: 'University of Technology',
    period: '2014 - 2018',
    description: 'Specialized in human-computer interaction and software engineering principles.',
    icon: <GraduationCap size={20} />,
  },
];

import { Palette, Code2 } from 'lucide-react';

export function Experience() {
  return (
    <section id="experience" className="section-padding bg-apple-gray/30 dark:bg-apple-dark/50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
                Experience & <br />
                <span className="text-apple-blue">Education</span>
              </h2>
              <p className="text-lg opacity-60 max-w-md">
                A timeline of my professional journey and academic background 
                in the world of technology and design.
              </p>
            </motion.div>
            
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-apple-dark/5 dark:before:bg-apple-gray/5">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-12 group"
                >
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white dark:bg-apple-dark border border-apple-dark/5 dark:border-apple-gray/5 flex items-center justify-center text-apple-blue shadow-sm group-hover:scale-110 transition-transform z-10">
                    {exp.icon}
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <span className="text-sm font-medium opacity-50 flex items-center gap-2">
                        <Calendar size={14} /> {exp.period}
                      </span>
                    </div>
                    <p className="text-apple-blue font-medium">{exp.company}</p>
                    <p className="text-sm opacity-60 leading-relaxed max-w-lg">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
                Tech Stack
              </h2>
              <p className="text-lg opacity-60">
                The tools and technologies I use to bring digital visions to life.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL', 'Figma', 'Framer Motion', 'D3.js', 'GraphQL', 'AWS', 'Docker'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="p-4 rounded-xl bg-white dark:bg-apple-dark/50 border border-apple-dark/5 dark:border-apple-gray/5 flex items-center justify-center text-center hover:border-apple-blue transition-colors group"
                >
                  <span className="text-sm font-medium opacity-70 group-hover:opacity-100 group-hover:text-apple-blue transition-all">
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-3xl bg-apple-blue text-white space-y-4 shadow-xl shadow-apple-blue/20"
            >
              <h3 className="text-2xl font-display font-bold">Always Learning</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                The tech landscape is constantly evolving, and so am I. 
                I'm currently exploring Web3 development, advanced AI integration, 
                and immersive 3D web experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
