import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, DownloadSimple } from '@phosphor-icons/react';

export default function CVModal({ isOpen, onClose, cvUrl }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-9999 flex items-center justify-center p-2 sm:p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ type: "spring", damping: 25, stiffness: 280 }}
          className="relative w-full max-w-5xl h-[95vh] md:h-[90vh] glass-card shadow-2xl rounded-3xl overflow-hidden z-10 flex flex-col border border-white/10"
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-border/40 bg-surface/50">
            <h3 className="text-lg md:text-xl font-serif tracking-tight text-foreground">
              Curriculum Vitae
            </h3>
            
            <div className="flex items-center gap-3">
              <a
                href={cvUrl}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent-matcha/15 hover:bg-accent-matcha/25 border border-accent-olive/20 hover:border-accent-olive/40 text-sm font-medium text-foreground transition-all duration-300"
              >
                <DownloadSimple weight="bold" className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </a>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-surface/60 hover:bg-surface border border-border/40 text-foreground transition-all duration-300 hover:scale-105 active:scale-95"
                title="Close Viewer"
              >
                <X weight="bold" className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 w-full bg-[#1e1e1e] relative">
            <object 
              data={cvUrl} 
              type="application/pdf" 
              className="absolute inset-0 w-full h-full"
            >
              <div className="flex flex-col items-center justify-center h-full p-8 text-center gap-4">
                <p className="text-neutral-400">Your browser does not support native PDF viewing.</p>
                <a 
                  href={cvUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-accent-matcha text-white font-medium hover:bg-accent-olive transition-colors"
                >
                  Open PDF Directly
                </a>
              </div>
            </object>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
