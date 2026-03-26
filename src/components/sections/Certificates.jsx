import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import { Certificate as CertificateIcon, X } from '@phosphor-icons/react';

function CertificatesModal({ certificates, initialIndex, isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  
  // Sync index when opening and prevent scrolling
  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [initialIndex, isOpen]);

  if (!isOpen) return null;
  const currentCert = certificates[activeIndex];

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="cert-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal Structure */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative z-10 w-full max-w-4xl bg-background border border-border rounded-xl overflow-hidden shadow-2xl dark:shadow-black/50 flex flex-col h-[85vh] md:h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 shrink-0 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                 <CertificateIcon weight="duotone" className="w-4 h-4 text-foreground/70" />
              </div>
              <h3 className="text-xl font-heading tracking-tight text-foreground">
                Certificates
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface hover:bg-foreground/5 flex items-center justify-center text-foreground/60 hover:text-foreground transition-all shrink-0 border border-border/60"
            >
              <X weight="bold" className="w-4 h-4" />
            </button>
          </div>

          {/* Tabs for switching certificates */}
          <div className="flex overflow-x-auto gap-2 p-3 border-b border-border/40 bg-surface/30 px-4 md:px-6 scrollbar-hide shrink-0">
             {certificates.map((cert, i) => (
               <button
                 key={i}
                 onClick={() => setActiveIndex(i)}
                 className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 border ${
                   activeIndex === i 
                     ? 'bg-foreground text-background border-foreground shadow-sm' 
                     : 'bg-transparent text-muted hover:bg-foreground/5 border-transparent'
                 }`}
               >
                 {cert.name}
               </button>
             ))}
          </div>

          {/* Content (Image Display) */}
          <div className="flex-1 w-full bg-neutral-900/5 dark:bg-black/20 p-4 md:p-8 flex flex-col items-center justify-center overflow-hidden relative">
            <h4 className="absolute top-4 md:top-6 left-6 flex flex-col gap-1 z-10">
               <span className="text-lg font-heading drop-shadow-sm" style={{ color: 'var(--ink-blue)' }}>{currentCert.name}</span>
               <span className="text-xs text-muted font-mono bg-background/60 backdrop-blur-md px-2 py-0.5 rounded-full w-fit">by {currentCert.provider}</span>
            </h4>
            
            <motion.div 
               key={activeIndex}
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.4, ease: "easeOut" }}
               className="w-full h-full flex items-center justify-center mt-6"
            >
               <img 
                 src={currentCert.link} 
                 alt={currentCert.name} 
                 className="max-w-full max-h-full object-contain rounded-lg shadow-xl ring-1 ring-border/50" 
               />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

function CertificateCard({ cert, index, onClick }) {
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
      onClick={() => onClick(index)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      className="group relative rounded-xl border border-border/60 hover:border-border bg-surface/40 hover:bg-surface transition-all duration-300 cursor-pointer will-change-transform overflow-hidden dark:bg-surface/60 dark:hover:bg-surface dark:border-border/70 dark:hover:border-border"
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
            <CertificateIcon weight="duotone" className="w-5 h-5 text-foreground/30 group-hover:text-foreground/60 transition-colors" />
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
  const [selectedCertIndex, setSelectedCertIndex] = useState(null);

  return (
    <>
      <Section id="certificates" title="Certificates">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {certificates.map((cert, idx) => (
            <CertificateCard 
              key={`${cert.name}-${idx}`} 
              cert={cert} 
              index={idx} 
              onClick={setSelectedCertIndex} 
            />
          ))}
        </div>
      </Section>

      <CertificatesModal 
        certificates={certificates}
        initialIndex={selectedCertIndex !== null ? selectedCertIndex : 0}
        isOpen={selectedCertIndex !== null}
        onClose={() => setSelectedCertIndex(null)}
      />
    </>
  );
}
