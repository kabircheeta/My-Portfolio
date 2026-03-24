import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
                Get in <span className="text-apple-blue">Touch</span>
              </h2>
              <p className="text-lg opacity-60 max-w-md">
                Have a project in mind or just want to say hello? 
                I'm always open to new opportunities and collaborations.
              </p>
            </div>
            
            <div className="space-y-6">
              {[
                { icon: <Mail size={24} />, label: 'Email', value: 'hello@aura.dev' },
                { icon: <MapPin size={24} />, label: 'Location', value: 'San Francisco, CA' },
                { icon: <Phone size={24} />, label: 'Phone', value: '+1 (555) 123-4567' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-6 p-6 rounded-2xl bg-apple-gray/30 dark:bg-apple-dark/50 border border-apple-dark/5 dark:border-apple-gray/5"
                >
                  <div className="p-3 rounded-full bg-apple-blue/10 text-apple-blue">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-50">{item.label}</p>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex space-x-4"
            >
              {[Github, Linkedin, Twitter, Instagram].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ 
                    scale: 1.1,
                    y: -5,
                    backgroundColor: 'rgb(0, 102, 204)', // apple-blue
                    color: '#ffffff'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="p-4 rounded-full bg-apple-gray/30 dark:bg-apple-dark/50 border border-apple-dark/5 dark:border-apple-gray/5 transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 md:p-12 rounded-3xl glass-card glass-highlight"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-70">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-white dark:bg-apple-dark border border-apple-dark/10 dark:border-apple-gray/10 focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium opacity-70">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl bg-white dark:bg-apple-dark border border-apple-dark/10 dark:border-apple-gray/10 focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium opacity-70">Message</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl bg-white dark:bg-apple-dark border border-apple-dark/10 dark:border-apple-gray/10 focus:border-apple-blue focus:ring-1 focus:ring-apple-blue outline-none transition-all resize-none"
                  placeholder="How can I help you?"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-apple-blue text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-apple-blue/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
              
              {isSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-500 font-medium"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
