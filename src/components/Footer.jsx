import React from 'react';
import { portfolioData } from '../data/portfolioData';
import Separator from './Separator';

export default function Footer() {
  const { hero } = portfolioData;

  return (
    <footer className="relative w-full pt-6 pb-6 flex flex-col gap-3">
      <Separator />
      <div className="flex items-center justify-between w-full px-1 pt-4">
        <p className="text-xs font-heading tracking-tight" style={{ color: 'var(--ink-blue)' }}>
          {hero.name}
        </p>
        <p className="text-[11px] text-muted-light font-mono">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
