import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import { Certificate } from '@phosphor-icons/react';

function CertificateCard({ cert, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [3, -3]), { stiffness: 250, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-3, 3]), { stiffness: 250, damping: 22 });

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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      className="group relative rounded-xl border border-border/60 hover:border-border-heavy/60 bg-surface/30 hover:bg-surface/60 transition-all duration-300 cursor-default will-change-transform overflow-hidden"
    >
      <div className="flex items-start gap-4 p-5">
        {/* Icon/Logo */}
        <div className="w-10 h-10 shrink-0 rounded-lg bg-foreground/5 border border-border/40 flex items-center justify-center overflow-hidden">
          {cert.icon ? (
            <img
              src={cert.icon}
              alt={cert.provider}
              className="w-6 h-6 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            />
          ) : (
            <Certificate weight="duotone" className="w-5 h-5 text-foreground/30 group-hover:text-foreground/60 transition-colors" />
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-sm font-semibold tracking-tight text-foreground group-hover:text-foreground transition-colors leading-snug">
            {cert.name}
          </h3>
          <span className="text-xs text-muted-light">
            {cert.provider}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const { certificates } = portfolioData;

  return (
    <Section id="certificates" title="Certificates">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
        {certificates.map((cert, idx) => (
          <CertificateCard key={`${cert.name}-${idx}`} cert={cert} index={idx} />
        ))}
      </div>
    </Section>
  );
}
