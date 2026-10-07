import React from 'react';
import { motion } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import { Article, Certificate, Trophy, Users, Star } from '@phosphor-icons/react';

function AchievementIcon({ type }) {
  switch (type) {
    case 'Article':
      return <Article weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
    case 'Certificate':
      return <Certificate weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
    case 'Trophy':
      return <Trophy weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
    case 'Users':
      return <Users weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
    default:
      return <Star weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
  }
}

export default function Achievements() {
  const { achievements, awards } = portfolioData;
  const items = achievements || awards || [];

  if (!items || items.length === 0) return null;

  return (
    <Section id="achievements" title="Key Milestones & Achievements">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-xl border border-card-border hover:border-card-border-hover bg-card hover:bg-card-hover transition-all duration-300 p-5 md:p-6 flex flex-col justify-between gap-4 hover:shadow-xl hover:shadow-ink/5"
          >
            <div>
              {/* Header: Icon & Category/Date */}
              <div className="flex items-center justify-between gap-2.5 mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-ink/10 dark:bg-ink-light/10 border border-ink/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <AchievementIcon type={item.iconType} />
                </div>
                {item.category && (
                  <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-surface border border-border/40 text-muted-light">
                    {item.category}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-foreground mb-2">
                {item.title}
              </h3>

              {/* Description */}
              {item.description && (
                <p className="text-sm text-muted leading-relaxed font-normal">
                  {item.description}
                </p>
              )}
            </div>

            {/* Footer Tag / Highlight */}
            {(item.highlight || item.date) && (
              <div className="pt-3 border-t border-border/30 flex items-center justify-between gap-2 text-xs">
                {item.highlight && (
                  <span className="inline-flex items-center gap-1 font-medium text-ink dark:text-ink-light bg-ink/10 dark:bg-ink-light/10 px-2 py-0.5 rounded-md border border-ink/20">
                    {item.highlight}
                  </span>
                )}
                {item.date && (
                  <span className="font-mono text-muted-light text-[11px]">
                    {item.date}
                  </span>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
