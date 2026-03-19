import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { LinkedinLogo, GithubLogo, EnvelopeSimple, ArrowUpRight } from '@phosphor-icons/react';
import DecodeText from './DecodeText';

export default function Footer() {
  const { hero } = portfolioData;
  const containerRef = useRef(null);

  return (
    <footer ref={containerRef} className="relative w-full pt-20 pb-10 flex flex-col items-center gap-16 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px aurora-gradient opacity-60" />

      <div className="w-full flex flex-col items-center justify-center text-center z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block"
        >
          
          <h2 className="text-[12.5vw] sm:text-[13vw] md:text-[10vw] font-serif font-medium tracking-tighter leading-tight text-foreground mb-6 whitespace-nowrap">
            Let's Connect
          </h2>
        </motion.div>

        <motion.a
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href={`mailto:${hero.email}`}
          className="group relative flex items-center justify-between p-2 pr-6 md:p-2.5 md:pr-8 rounded-full bg-surface/50 backdrop-blur-md border border-border/40 hover:border-accent-olive/30 hover:bg-surface/80 transition-all duration-500 shadow-sm max-w-[95vw] overflow-hidden cursor-pointer"
        >

          <div className="relative z-10 w-10 h-10 md:w-14 md:h-14 bg-accent-olive rounded-full flex items-center justify-center mr-3 md:mr-5 group-hover:bg-accent hover:scale-105 transition-all duration-500 overflow-hidden shrink-0">
             <div className="relative w-full h-full flex items-center justify-center">
                <ArrowUpRight className="absolute w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)] group-hover:translate-x-[200%] group-hover:-translate-y-[200%]" />
                <ArrowUpRight className="absolute w-5 h-5 md:w-6 md:h-6 text-white -translate-x-[200%] translate-y-[200%] transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)] group-hover:translate-x-0 group-hover:translate-y-0" />
             </div>
          </div>
          
          <span className="relative z-10 text-sm sm:text-base md:text-xl font-medium tracking-tight text-foreground truncate">
            {hero.email}
          </span>
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-border/40 z-10"
      >
        <p className="text-xs md:text-sm text-muted/60 font-medium">
          © {new Date().getFullYear()} {hero.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          {hero.linkedin && (
            <a
              href={hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-surface/80 border border-border/50 text-foreground hover:bg-accent-matcha/20 hover:text-accent-olive hover:border-accent-olive/30 transition-all duration-300 shadow-sm"
              title="LinkedIn"
            >
              <LinkedinLogo weight="fill" className="w-5 h-5" />
            </a>
          )}
          {hero.github && (
            <a
              href={hero.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-surface/80 border border-border/50 text-foreground hover:bg-accent-matcha/20 hover:text-accent-olive hover:border-accent-olive/30 transition-all duration-300 shadow-sm"
              title="GitHub"
            >
              <GithubLogo weight="fill" className="w-5 h-5" />
            </a>
          )}
        </div>
      </motion.div>
    </footer>
  );
}
