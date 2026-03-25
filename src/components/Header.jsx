import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Sun, Moon, FileText } from '@phosphor-icons/react';
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
      ? ['rgba(10, 10, 10, 0.4)', 'rgba(10, 10, 10, 0.80)']
      : ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.80)']
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
          className="w-full max-w-3xl h-12 rounded-full backdrop-blur-md border transition-all duration-300 pointer-events-auto flex items-center justify-between px-5"
        >
          <motion.div style={{ opacity: nameOpacity, y: nameY }} className="text-sm font-medium tracking-tight text-foreground truncate max-w-[50%]">
            {portfolioData.hero.name}
          </motion.div>
          <div className="flex items-center gap-1.5 ml-auto">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-all duration-200 active:scale-95"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ y: 12, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -12, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Sun weight="bold" className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ y: 12, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -12, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Moon weight="bold" className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => setIsCVOpen(true)}
              className="flex items-center gap-1.5 h-8 px-3 rounded-full hover:bg-foreground/5 text-xs font-medium text-foreground/60 hover:text-foreground transition-all duration-200 active:scale-95"
            >
              <FileText weight="bold" className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume</span>
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
