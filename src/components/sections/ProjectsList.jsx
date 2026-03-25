import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import { ArrowUpRight, GithubLogo, X } from '@phosphor-icons/react';

/* ── Hover Tooltip ── */
function ProjectTooltip({ project, x, y, visible }) {
  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          style={{ left: x, top: y }}
          className="fixed z-50 pointer-events-none w-56 p-3.5 rounded-xl bg-foreground text-background shadow-lg border border-foreground/10"
        >
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {project.tech.slice(0, 5).map((t, i) => (
              <span key={i} className="text-[10px] font-medium bg-background/15 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
            {project.tech.length > 5 && (
              <span className="text-[10px] font-medium bg-background/10 px-2 py-0.5 rounded-full opacity-60">
                +{project.tech.length - 5}
              </span>
            )}
          </div>
          <p className="text-[11px] opacity-50 font-medium">Click to view details →</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── Project Modal ── */
function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg bg-background border border-border rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border/60 flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-background transition-all"
            >
              <X weight="bold" className="w-4 h-4" />
            </button>

            {/* Image */}
            <div className="w-full h-48 md:h-56 bg-surface overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-4">
              <div>
                <h3 className="text-lg font-heading tracking-tight mb-1" style={{ color: 'var(--ink-blue)' }}>
                  {project.title}
                </h3>
                <span className="text-xs text-muted-light font-mono">{project.date}</span>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[11px] font-medium text-muted bg-foreground/5 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2">
                {project.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-foreground/15 shrink-0" />
                    <p className="text-[13px] text-muted leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2.5 pt-2 border-t border-border/30">
                {project.liveLink && project.liveLink !== '#' && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-foreground text-background rounded-full text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    Visit Site <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.githubLink && project.githubLink !== '#' && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-border/60 text-foreground/70 hover:text-foreground hover:border-border-heavy rounded-full text-xs font-medium transition-all"
                  >
                    View Code <GithubLogo weight="fill" className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── Project Card ── */
function ProjectCard({ project, index, onClick }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setTooltipPos({ x: e.clientX + 16, y: e.clientY + 16 });
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        onClick={() => onClick(project)}
        className="group relative rounded-xl border border-border/60 hover:border-border-heavy/60 bg-surface/50 hover:bg-surface transition-all duration-300 overflow-hidden cursor-pointer"
      >
        {/* Image */}
        <div className="w-full h-40 overflow-hidden bg-surface">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        </div>

        {/* Title */}
        <div className="p-4">
          <h3 className="text-sm font-semibold tracking-tight text-foreground leading-snug">
            {project.title}
          </h3>
        </div>
      </motion.div>

      <ProjectTooltip
        project={project}
        x={tooltipPos.x}
        y={tooltipPos.y}
        visible={hovered}
      />
    </>
  );
}

/* ── Projects Section ── */
export default function ProjectsList() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <Section id="projects" title="Projects">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {projects.map((project, idx) => (
            <ProjectCard
              key={idx}
              project={project}
              index={idx}
              onClick={setSelectedProject}
            />
          ))}
        </div>
      </Section>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
