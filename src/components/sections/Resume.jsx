import React from 'react';
import { motion } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';

export default function Resume() {
  const { education, awards } = portfolioData;

  return (
    <Section id="resume" title="Education">
      <div className="flex w-full flex-col gap-14 pt-2">
        {education && education.length > 0 && (
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/42">
              Education
            </h3>

            <div className="flex flex-col">
              {education.map((edu, idx) => (
                <motion.div
                  key={`${edu.institution}-${idx}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start justify-between gap-4 border-b border-border/40 py-4 last:border-b-0"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base md:text-[17px] font-serif tracking-tight text-foreground">
                      {edu.institution}
                    </h4>
                    <p className="mt-0.5 text-sm text-muted/70 font-light leading-relaxed">
                      {edu.degree}
                      {edu.grade && (
                        <>
                          {' · '}
                          <span className="text-accent-olive/80 font-medium">{edu.grade}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted/40 pt-0.5">
                    {edu.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {awards && awards.length > 0 && (
          <div className="flex w-full flex-col gap-4">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/42">
              Activities & Achievements
            </h3>
            <div className="flex flex-col">
              {awards.map((award, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 border-b border-border/35 py-3.5 last:border-b-0 group cursor-default"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-matcha/40 shrink-0" />
                  <p
                    className="text-sm md:text-[15px] font-normal leading-relaxed text-foreground/80 [&>span]:font-medium"
                    dangerouslySetInnerHTML={{ __html: award.titleHtml || award.title }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
