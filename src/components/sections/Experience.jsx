import React from 'react';
import { motion } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import { Briefcase, CalendarBlank, MapPin, Sparkle } from '@phosphor-icons/react';

function ExperienceCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl border border-card-border hover:border-card-border-hover bg-card hover:bg-card-hover transition-all duration-300 p-5 md:p-6 flex flex-col gap-3.5"
    >
      {/* Header: Role, Org, Type & Period */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground group-hover:text-foreground">
              {item.role}
            </h3>
            {item.type && (
              <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-ink/10 text-ink dark:text-ink-light border border-ink/20">
                {item.type}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted">
            <span className="font-medium text-foreground/85">{item.organization}</span>
            {item.location && (
              <>
                <span className="opacity-40">·</span>
                <span className="inline-flex items-center gap-1 text-muted-light">
                  <MapPin weight="fill" className="w-3 h-3 opacity-60" />
                  {item.location}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface border border-border/40 text-xs font-mono text-muted-light self-start sm:self-auto shrink-0">
          <CalendarBlank weight="regular" className="w-3.5 h-3.5 opacity-70" />
          <span>{item.period}</span>
        </div>
      </div>

      {/* 1-2 Liner Key Points (No long paragraphs) */}
      {item.points && item.points.length > 0 && (
        <div className="flex flex-col gap-2 pt-1 border-t border-border/30">
          {item.points.slice(0, 2).map((pt, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--ink-blue)', opacity: 0.7 }} />
              <p className="text-[13px] md:text-[14px] text-muted leading-relaxed font-normal">
                {pt}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills pills */}
      {item.skills && item.skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.skills.map((skill, i) => (
            <span
              key={i}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-foreground/5 dark:bg-foreground/10 text-muted border border-border/30"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Experience() {
  const { experience } = portfolioData;

  if (!experience || experience.length === 0) return null;

  return (
    <Section id="experience" title="Experience">
      <div className="flex flex-col gap-4 pt-2">
        {experience.map((item, idx) => (
          <ExperienceCard key={`${item.role}-${idx}`} item={item} index={idx} />
        ))}
      </div>
    </Section>
  );
}
