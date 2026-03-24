import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useEffect } from 'react';

export function DynamicBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const moveX = useTransform(springX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-20, 20]);
  const moveY = useTransform(springY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-20, 20]);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {/* Animated Gradient Orbs */}
      <motion.div
        style={{ x: moveX, y: moveY }}
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-apple-blue/5 blur-[120px] dark:bg-apple-blue/10"
      />
      <motion.div
        style={{ x: useTransform(moveX, (v) => -v), y: useTransform(moveY, (v) => -v) }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/5 blur-[150px] dark:bg-purple-500/10"
      />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
