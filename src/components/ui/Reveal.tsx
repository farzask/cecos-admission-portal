import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};
export function Reveal({ children, delay = 0, y = 16, className }: Props) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{
        opacity: 0,
        y
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-80px'
      }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}>
      
      {children}
    </motion.div>);

}