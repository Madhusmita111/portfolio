import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import { ArrowUpRight, X, GithubLogo } from '@phosphor-icons/react';

export default function ProjectsList() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX - 150);
    mouseY.set(e.clientY - 100);
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

  return (
    <Section id="projects" title="Projects">
      <div
        className="flex flex-col w-full relative pt-4 rounded-3xl px-3 md:px-6"
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-col border-t border-border/40">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => setSelectedProject(project)}
              className={`relative z-0 flex items-center justify-between py-5 md:py-8 border-b transition-all px-3 md:px-6 -mx-3 md:-mx-6 rounded-2xl group cursor-pointer ${
                hoveredProject === project ? 'border-transparent' : 'border-border/50'
              }`}
            >
              <AnimatePresence>
                {hoveredProject === project && (
                  <motion.div
                    layoutId="projectHoverLayer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    className="absolute inset-0 bg-[#0d0e0a] rounded-2xl -z-10"
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 flex items-center gap-3 md:gap-6 pointer-events-none">
                <span className="text-2xl font-serif text-accent-matcha tabular-nums w-6 shrink-0 hidden md:block group-hover:text-neutral-500 transition-colors duration-300">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                  <span className="text-base md:text-lg font-medium text-foreground tracking-tight group-hover:text-white transition-colors">
                    {project.title}
                  </span>
                  <span className="hidden md:inline-block text-muted-light group-hover:text-neutral-600 transition-colors">•</span>
                  <span className="text-sm md:text-base text-muted font-light group-hover:text-neutral-400 transition-colors">
                    {project.tech[0]}
                  </span>
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-4 md:gap-8 shrink-0 pointer-events-none">
                <span className="text-sm md:text-base text-muted font-medium font-serif group-hover:text-neutral-400 transition-colors">
                  {project.date}
                </span>
                <motion.div
                  className="flex items-center justify-center"
                  whileHover={{ scale: 1.2, rotate: 45 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <ArrowUpRight weight="bold" className="w-5 h-5 text-muted group-hover:text-white transition-all" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {hoveredProject && !selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -4, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.85, rotate: 4, filter: 'blur(8px)' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: springX, y: springY }}
            className="fixed top-0 left-0 pointer-events-none z-40 w-[300px] h-[200px] rounded-2xl overflow-hidden shadow-olive-lift border border-border-accent/70 bg-surface hidden md:block"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--media-overlay-strong),var(--media-overlay-soft))] z-10" />
            <img
              src={hoveredProject.image}
              alt={hoveredProject.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {createPortal(
        <AnimatePresence>
          {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/72 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.92, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(8px)' }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="relative w-full max-w-3xl glass-card shadow-olive-lift rounded-3xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-surface/65 hover:bg-surface backdrop-blur-md rounded-full text-foreground transition-colors z-20 border border-border-accent/60"
              >
                <X weight="bold" className="w-5 h-5" />
              </button>

              <div className="w-full h-64 md:h-80 shrink-0 relative bg-surface-matcha/60">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--modal-overlay-strong),var(--modal-overlay-soft),transparent)]" />
              </div>

              <div className="flex flex-col gap-6 p-6 md:p-10 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl md:text-5xl font-serif font-medium text-foreground">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <span className="text-sm font-medium text-muted">{selectedProject.date}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="text-sm font-medium bg-surface-chip text-foreground px-3 py-1.5 rounded-full border border-border-accent/55">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="w-full h-px bg-border-accent/80 my-2" />

                <div className="flex flex-col gap-4">
                  <h4 className="text-lg font-medium text-foreground">About the Project</h4>
                  <ul className="flex flex-col gap-3">
                    {selectedProject.points.map((point, i) => (
                      <li key={i} className="text-base text-muted leading-relaxed flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border">
                  {selectedProject.liveLink && selectedProject.liveLink !== '#' && (
                    <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-accent-olive text-white rounded-full font-medium text-sm hover:scale-105 hover:bg-accent-matcha transition-all flex items-center gap-2">
                      Visit Site <ArrowUpRight weight="bold" />
                    </a>
                  )}
                  {selectedProject.githubLink && selectedProject.githubLink !== '#' && (
                    <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-surface border border-border-accent/70 text-foreground hover:bg-surface-matcha rounded-full font-medium text-sm transition-colors flex items-center gap-2">
                      View Code <GithubLogo weight="fill" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </Section>
  );
}
