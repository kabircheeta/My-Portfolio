import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Visionary Dashboard',
    category: 'SaaS Platform',
    image: 'https://picsum.photos/seed/project1/800/600',
    description: 'A comprehensive analytics dashboard for modern businesses, built with React and D3.js.',
    link: '#',
    github: '#',
  },
  {
    title: 'Lumina E-Commerce',
    category: 'E-Commerce',
    image: 'https://picsum.photos/seed/project2/800/600',
    description: 'A premium e-commerce experience with seamless transitions and lightning-fast performance.',
    link: '#',
    github: '#',
  },
  {
    title: 'Aura Mobile App',
    category: 'Mobile App',
    image: 'https://picsum.photos/seed/project3/800/600',
    description: 'A minimalist meditation app designed to bring peace and tranquility to your daily life.',
    link: '#',
    github: '#',
  },
  {
    title: 'Nexus Social',
    category: 'Social Network',
    image: 'https://picsum.photos/seed/project4/800/600',
    description: 'A decentralized social network focused on privacy and user-owned data.',
    link: '#',
    github: '#',
  },
];

export function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <div className="space-y-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
              Selected Projects
            </h2>
            <p className="text-lg md:text-xl font-light opacity-60 max-w-2xl mx-auto">
              A curated collection of my most impactful digital creations, 
              where design meets functionality.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl overflow-hidden glass-card glass-highlight hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-shadow duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-apple-dark/90 via-apple-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm font-medium tracking-wider uppercase opacity-70">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-display font-bold">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base opacity-80 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex space-x-4 pt-4">
                    <a
                      href={project.link}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.github}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Desktop Overlay (Always visible on mobile) */}
              <div className="p-8 md:hidden">
                <p className="text-xs font-medium tracking-wider uppercase opacity-50 mb-2">
                  {project.category}
                </p>
                <h3 className="text-xl font-display font-bold mb-2">
                  {project.title}
                </h3>
                <p className="text-sm opacity-60 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
