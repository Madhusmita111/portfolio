import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { LinkedinLogo, GithubLogo, EnvelopeSimple } from '@phosphor-icons/react';

export default function Footer() {
  const { hero } = portfolioData;

  return (
    <footer className="relative w-full pt-16 pb-8 flex flex-col gap-8">
      <div className="h-px w-full bg-border" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-heading tracking-tight" style={{ color: 'var(--ink-blue)' }}>
            {hero.name}
          </p>
          <p className="text-xs text-muted-light">
            © {new Date().getFullYear()} · All rights reserved
          </p>
        </div>

        <div className="flex items-center gap-1">
          {hero.linkedin && (
            <a
              href={hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-all duration-200"
              title="LinkedIn"
            >
              <LinkedinLogo weight="fill" className="w-4 h-4" />
            </a>
          )}
          {hero.github && (
            <a
              href={hero.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-all duration-200"
              title="GitHub"
            >
              <GithubLogo weight="fill" className="w-4 h-4" />
            </a>
          )}
          {hero.email && (
            <a
              href={`mailto:${hero.email}`}
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-foreground/5 text-foreground/40 hover:text-foreground transition-all duration-200"
              title="Email"
            >
              <EnvelopeSimple weight="fill" className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
