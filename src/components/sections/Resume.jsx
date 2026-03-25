import React from 'react';
import { motion } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';

export default function Resume() {
  const { education } = portfolioData;

  return (
    <Section id="education" title="Education">
      <div className="flex w-full flex-col pt-2">
        {education && education.length > 0 && (
          <div className="flex flex-col">
            {education.map((edu, idx) => (
              <motion.div
                key={`${edu.institution}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-1 border-b border-border/40 py-4 last:border-b-0"
              >
                <h4 className="text-base font-semibold tracking-tight text-foreground">
                  {edu.institution}
                </h4>
                <p className="text-sm text-muted font-normal leading-relaxed">
                  {edu.degree}
                  {edu.grade && (
                    <>
                      {' · '}
                      <span className="font-medium" style={{ color: 'var(--ink-blue)' }}>{edu.grade}</span>
                    </>
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
