import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import CVModal from './CVModal';

export default function Header() {
  const { scrollY } = useScroll();
  const [isCVOpen, setIsCVOpen] = useState(false);
  
  const nameOpacity = useTransform(scrollY, [200, 250], [0, 1]);
  const nameY = useTransform(scrollY, [200, 250], [10, 0]);
  
  const headerBg = useTransform(
    scrollY,
    [0, 50],
    ['rgba(252, 252, 250, 0.4)', 'rgba(252, 252, 250, 0.6)']
  );
  
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.1)']
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
          
          <button
            onClick={() => setIsCVOpen(true)}
            className="flex items-center gap-2 ml-auto h-9 px-4 rounded-full bg-accent-matcha/10 hover:bg-accent-matcha/20 border border-accent-olive/20 hover:border-accent-olive/40 text-xs md:text-sm font-medium text-foreground transition-all duration-300 shadow-sm hover:shadow-olive-lift active:scale-95"
          >
            <span className="hidden sm:inline">View Resume</span>
            <span className="sm:hidden">CV</span>
          </button>
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
