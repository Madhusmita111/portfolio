import React from 'react';
import Header from './Header';

export default function PageLayout({ children }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center selection:bg-accent selection:text-white overflow-x-hidden">
      <Header />
      <main className="relative z-10 w-full max-w-3xl px-6 md:px-8 pt-32 pb-20 md:pb-28 flex flex-col gap-14 md:gap-20">
        {children}
      </main>
    </div>
  );
}
