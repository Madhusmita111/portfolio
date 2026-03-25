import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Section({ id, title, children, className = '' }) {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.4'],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -60px 0px' }}
      className={`w-full flex flex-col gap-10 md:gap-14 ${className}`}
    >
      {title && (
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-heading tracking-tight" style={{ color: 'var(--ink-blue)' }}>
            {title}
          </h2>
          <motion.div
            style={{ width: lineWidth }}
            className="h-px rounded-full bg-border"
          />
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="w-full">
        {children}
      </motion.div>
    </motion.section>
  );
}
