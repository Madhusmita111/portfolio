import React from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';
import { PaperPlaneTilt, ArrowRight } from '@phosphor-icons/react';

export default function Contact() {
  const { hero } = portfolioData;

  return (
    <section id="contact" className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full rounded-2xl border border-border/60 bg-surface/50 overflow-hidden"
      >
        {/* Decorative grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(var(--ink-blue) 1px, transparent 1px),
              linear-gradient(90deg, var(--ink-blue) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-8 py-16 md:py-20 gap-6">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'var(--ink-blue)' }}
          >
            <PaperPlaneTilt weight="fill" className="w-6 h-6 text-white" />
          </motion.div>

          <div className="flex flex-col gap-2 max-w-md">
            <h2 className="text-2xl md:text-3xl font-heading tracking-tight" style={{ color: 'var(--ink-blue)' }}>
              Let's Work Together
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Drop me a line!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`mailto:${hero.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90 shadow-sm"
              style={{ background: 'var(--ink-blue)' }}
            >
              Get in Touch
              <ArrowRight weight="bold" className="w-4 h-4" />
            </motion.a>

            {hero.linkedin && (
              <a
                href={hero.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground/70 hover:text-foreground hover:border-border-heavy text-sm font-medium transition-all"
              >
                Connect on LinkedIn
              </a>
            )}
          </div>

          <p className="text-xs text-muted-light font-mono mt-2">{hero.email}</p>
        </div>
      </motion.div>
    </section>
  );
}
