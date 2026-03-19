import React from 'react';
import { motion } from 'motion/react';
import Header from './Header';

export default function PageLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center selection:bg-accent selection:text-white overflow-x-hidden">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-[200vh] opacity-[0.03] pointer-events-none text-foreground" xmlns="http://www.w3.org/2000/svg">
          <pattern id="data-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="60" cy="60" r="1.5" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#data-grid)" />
        </svg>

      </div>

      <Header />
      <main className="relative z-10 w-full max-w-5xl px-6 md:px-12 pt-32 pb-20 md:pb-28 flex flex-col gap-28 md:gap-40">
        {children}
      </main>
    </div>
  );
}
