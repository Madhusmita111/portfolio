import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Sun, Moon } from '@phosphor-icons/react';
import { portfolioData } from '../data/portfolioData';
import CVModal from './CVModal';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { scrollY } = useScroll();
  const [isCVOpen, setIsCVOpen] = useState(false);
  
  const nameOpacity = useTransform(scrollY, [200, 250], [0, 1]);
  const nameY = useTransform(scrollY, [200, 250], [10, 0]);
  
  const { theme, toggleTheme } = useTheme();

  const headerBg = useTransform(
    scrollY,
    [0, 50],
    theme === 'dark' 
      ? ['rgba(20, 20, 20, 0.4)', 'rgba(20, 20, 20, 0.75)']
      : ['rgba(252, 252, 250, 0.4)', 'rgba(252, 252, 250, 0.75)']
  );
  
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    theme === 'dark'
      ? ['rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.08)']
      : ['rgba(0, 0, 0, 0.03)', 'rgba(0, 0, 0, 0.08)']
  );

  return (
    <>
      <div className="fixed top-4 md:top-6 inset-x-0 z-100 flex justify-center pointer-events-none px-4">
        <motion.header
          style={{
            backgroundColor: headerBg,
            borderColor: headerBorder,
          }}
          className="w-full max-w-5xl h-14 rounded-full backdrop-blur-sm transition-all duration-300 pointer-events-auto flex items-center justify-between px-6"
        >
          <motion.div style={{ opacity: nameOpacity, y: nameY }} className="font-serif text-base md:text-lg font-medium tracking-tight text-foreground truncate max-w-[50%]">
            {portfolioData.hero.name}
          </motion.div>
          <div className="flex items-center gap-2 md:gap-3 ml-auto">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center w-9 h-9 rounded-full bg-surface/50 hover:bg-surface-matcha/80 border border-border-accent/40 text-foreground transition-all duration-300 overflow-hidden shadow-sm hover:shadow-olive-lift active:scale-95"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ y: 20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun weight="fill" className="w-4 h-4 text-amber-200" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ y: 20, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon weight="fill" className="w-4 h-4 text-slate-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => setIsCVOpen(true)}
              className="flex items-center justify-center h-9 px-4 rounded-full bg-accent-matcha/10 hover:bg-accent-matcha/20 border border-accent-olive/20 hover:border-accent-olive/40 text-xs md:text-sm font-medium text-foreground transition-all duration-300 shadow-sm hover:shadow-olive-lift active:scale-95"
            >
              <span className="hidden sm:inline">View Resume</span>
              <span className="sm:hidden">CV</span>
            </button>
          </div>
        </motion.header>
      </div>

      <CVModal 
        isOpen={isCVOpen} 
        onClose={() => setIsCVOpen(false)} 
        cvUrl="/pdf/Data CV.pdf" 
      />
    </>
  );
}
