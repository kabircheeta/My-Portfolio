/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { AuthBar } from './components/AuthBar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Admin } from './components/Admin';
import { CustomCursor } from './components/CustomCursor';
import { ErrorBoundary } from './components/ErrorBoundary';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, User } from './firebase';

const ADMIN_EMAIL = 'kabirsahab96@gmail.com';

export default function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      setIsAdminView(window.location.hash === '#admin');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      unsubscribe();
    };
  }, []);

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <ErrorBoundary>
      <div className="min-h-screen selection:bg-apple-blue selection:text-white cursor-none">
        <AuthBar />
        <CustomCursor />
        <Navbar />
      
      {isAdminView && isAdmin ? (
        <Admin />
      ) : (
        <>
          <main>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <Hero />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <About />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Projects />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Experience />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Contact />
            </motion.div>
          </main>

          <motion.footer 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="py-12 border-t border-apple-dark/5 dark:border-apple-gray/5 bg-apple-gray/30 dark:bg-apple-dark/50"
          >
            <div className="container-custom px-6 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <a href="#" className="text-2xl font-display font-bold tracking-tight">
                  AURA<span className="text-apple-blue">.</span>
                </a>
                <p className="text-sm opacity-50 max-w-xs">
                  Designing and developing digital products that make a difference. 
                  Based in San Francisco, working worldwide.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="flex space-x-8">
                  {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-sm font-medium opacity-50 hover:opacity-100 transition-opacity"
                    >
                      {item}
                    </a>
                  ))}
                </div>
                
                <p className="text-xs opacity-30">
                  © {new Date().getFullYear()} Aura Portfolio. All rights reserved.
                </p>
              </div>
            </div>
          </motion.footer>
        </>
      )}
      
      {/* Custom Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-apple-blue via-purple-500 to-apple-blue z-[60] origin-left"
        style={{ scaleX: useScrollProgress() }}
      />
    </div>
    </ErrorBoundary>
  );
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setProgress(currentScroll / totalHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}
