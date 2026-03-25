import React from 'react';
import { motion } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';

export default function Achievements() {
  const { awards } = portfolioData;

  if (!awards || awards.length === 0) return null;

  return (
    <Section id="achievements" title="Achievements">
      <div className="flex flex-col pt-2">
        {awards.map((award, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3 border-b border-border/35 py-3.5 last:border-b-0 group cursor-default"
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--ink-blue)', opacity: 0.4 }} />
            <p
              className="text-sm md:text-[15px] font-normal leading-relaxed text-foreground/80 [&>span]:font-medium"
              dangerouslySetInnerHTML={{ __html: award.titleHtml || award.title }}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
