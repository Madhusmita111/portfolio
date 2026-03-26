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
        className="relative w-full rounded-xl border border-card-border bg-card overflow-hidden"
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 py-12 md:py-14 gap-5">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-btn-email"
          >
            <PaperPlaneTilt weight="fill" className="w-5 h-5 text-white" />
          </motion.div>

          <div className="flex flex-col gap-1.5 max-w-sm">
            <h2 className="text-xl md:text-2xl font-heading tracking-tight" style={{ color: 'var(--ink-blue)' }}>
              Let's Work Together
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Open to new projects, creative ideas, and opportunities.
              <br /> Drop me a line!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`mailto:${hero.email}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90 shadow-sm bg-btn-email"
            >
              Get in Touch
              <ArrowRight weight="bold" className="w-4 h-4" />
            </motion.a>

            {hero.linkedin && (
              <a
                href={hero.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-card-border text-foreground/70 hover:text-foreground hover:border-card-border-hover text-sm font-medium transition-all"
              >
                Connect on LinkedIn
              </a>
            )}
          </div>

          <p className="text-xs text-muted-light font-mono">{hero.email}</p>
        </div>
      </motion.div>
    </section>
  );
}
