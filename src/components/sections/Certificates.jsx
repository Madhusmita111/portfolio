import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';

const providerColors = {
  'HackerRank': { bg: 'oklch(64% 0.06 150 / 0.12)', border: 'oklch(64% 0.06 150 / 0.3)', text: 'oklch(45% 0.05 150)' },
  'NPTEL': { bg: 'oklch(60% 0.05 260 / 0.10)', border: 'oklch(60% 0.05 260 / 0.3)', text: 'oklch(42% 0.04 260)' },
  'Coursera': { bg: 'oklch(58% 0.06 250 / 0.10)', border: 'oklch(58% 0.06 250 / 0.3)', text: 'oklch(42% 0.05 250)' },
};

const defaultProviderColor = { bg: 'oklch(70% 0.03 107 / 0.1)', border: 'oklch(70% 0.03 107 / 0.3)', text: 'oklch(45% 0.02 107)' };

function CertificateCard({ cert, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const colors = providerColors[cert.provider] || defaultProviderColor;

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { stiffness: 250, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { stiffness: 250, damping: 22 });
  const glowX = useTransform(mouseX, [0, 1], [0, 100]);
  const glowY = useTransform(mouseY, [0, 1], [0, 100]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)', scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      className="group relative rounded-2xl p-px cursor-default will-change-transform bg-accent-matcha/10"
    >
      <div className="absolute inset-0 rounded-2xl shimmer-border opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative rounded-2xl glass-card p-5 md:p-7 h-full flex flex-col gap-4 overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, var(--glass-glow), transparent 60%)`,
          }}
        />

        <div className="relative z-10 h-8 flex items-center">
          {cert.icon ? (
            <img 
              src={cert.icon} 
              alt={cert.provider} 
              className="h-full w-auto object-contain transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-105" 
            />
          ) : (
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                color: colors.text,
              }}
            >
              {cert.provider}
            </span>
          )}
        </div>

        <h3 className="relative z-10 text-base md:text-lg font-serif font-light tracking-tight text-foreground group-hover:text-foreground transition-colors duration-300 flex-1">
          {cert.name}
        </h3>

      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const { certificates } = portfolioData;

  return (
    <Section id="certificates" title="Certificates">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-4">
        {certificates.map((cert, idx) => (
          <CertificateCard key={`${cert.name}-${idx}`} cert={cert} index={idx} />
        ))}
      </div>
    </Section>
  );
}
