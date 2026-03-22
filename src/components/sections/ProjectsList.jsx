import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import { ArrowUpRight, GithubLogo, CaretDown } from '@phosphor-icons/react';

export default function ProjectsList() {
  const { projects } = portfolioData;
  const [expandedIdx, setExpandedIdx] = useState(null);
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

  const toggleProject = (idx) => {
    setExpandedIdx(expandedIdx === idx ? null : idx);
    setHoveredProject(null);
  };

  return (
    <Section id="projects" title="Projects">
      <div
        className="flex flex-col w-full relative pt-4 px-3 md:px-6"
        onMouseMove={handleMouseMove}
      >
        <div className="flex flex-col gap-2">
          {projects.map((project, idx) => {
            const isExpanded = expandedIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col rounded-xl border transition-all duration-300 ${isExpanded ? 'bg-surface-matcha border-border/40 shadow-sm' : 'bg-surface-matcha border-border/20 hover:border-border/40'}`}
              >
                {/* Row Header */}
                <div
                  onMouseEnter={() => !isExpanded && setHoveredProject(project)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => toggleProject(idx)}
                  className="relative z-0 flex items-center justify-between py-5 md:py-6 px-4 md:px-6 group cursor-pointer"
                >
                  {/* Hover fill layer */}
                  <AnimatePresence>
                    {hoveredProject === project && !isExpanded && (
                      <motion.div
                        layoutId="projectHoverLayer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        className="absolute inset-0 bg-foreground rounded-2xl -z-10"
                      />
                    )}
                  </AnimatePresence>

                  {/* Left: Index + Title + Tech */}
                  <div className="relative z-10 flex items-center gap-4 md:gap-6 pointer-events-none min-w-0">
                    <span className={`text-lg md:text-xl font-serif tabular-nums w-6 shrink-0 hidden md:block transition-colors duration-300 ${
                      hoveredProject === project && !isExpanded ? 'text-background/40' : isExpanded ? 'text-accent-matcha' : 'text-foreground/20'
                    }`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-1">
                      <span className={`text-base md:text-lg font-serif font-medium tracking-tight transition-colors duration-300 ${
                        hoveredProject === project && !isExpanded ? 'text-background' : 'text-foreground'
                      }`}>
                        {project.title}
                      </span>
                      <span className={`text-xs md:text-sm font-sans transition-colors duration-300 truncate ${
                        hoveredProject === project && !isExpanded ? 'text-background/50' : 'text-foreground/40'
                      }`}>
                        {project.tech.slice(0, 3).join(' / ')}
                      </span>
                    </div>
                  </div>

                  {/* Right: Date + Caret */}
                  <div className="relative z-10 flex items-center gap-4 md:gap-6 shrink-0 pointer-events-none">
                    <span className={`text-sm font-serif italic transition-colors duration-300 hidden sm:block ${
                      hoveredProject === project && !isExpanded ? 'text-background/50' : 'text-foreground/30'
                    }`}>
                      {project.date}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        hoveredProject === project && !isExpanded
                          ? 'border-background/30 bg-background/10'
                          : isExpanded
                            ? 'border-accent-matcha/30 bg-accent-matcha/10'
                            : 'border-border/40'
                      }`}
                    >
                      <CaretDown weight="bold" className={`w-4 h-4 transition-colors duration-300 ${
                        hoveredProject === project && !isExpanded ? 'text-background' : isExpanded ? 'text-accent-matcha' : 'text-foreground/40'
                      }`} />
                    </motion.div>
                  </div>
                </div>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        height: { type: "spring", stiffness: 200, damping: 30 },
                        opacity: { duration: 0.25, delay: 0.05 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pt-1 px-4 md:px-6">
                        {/* Image + Content grid */}
                        <div className="flex flex-col md:flex-row gap-5 md:gap-6">
                          {/* Image */}
                          <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                            className="w-full md:w-[280px] h-44 md:h-[200px] rounded-xl overflow-hidden bg-surface shrink-0"
                          >
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>

                          {/* Right: Details */}
                          <div className="flex-1 flex flex-col min-w-0">
                            {/* Tech Tags */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                              className="flex flex-wrap gap-1.5 mb-4"
                            >
                              {project.tech.map((t, i) => (
                                <span key={i} className="text-[11px] font-medium text-foreground/50 bg-foreground/40 px-2.5 py-1 rounded-full">
                                  {t}
                                </span>
                              ))}
                            </motion.div>

                            {/* Points */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 }}
                              className="flex flex-col gap-2 flex-1"
                            >
                              <ul className="flex flex-col gap-2">
                                {project.points.map((point, i) => (
                                  <li key={i} className="text-[13px] text-foreground/55 leading-relaxed flex items-start gap-2.5">
                                    <span className="mt-[7px] w-1 h-1 rounded-full bg-foreground/15 shrink-0" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          </div>
                        </div>

                        {/* Action Buttons — full width bar */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                          className="flex flex-wrap gap-2.5 pt-4 mt-5 border-t border-border/20"
                        >
                          {project.liveLink && project.liveLink !== '#' && (
                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-foreground text-background rounded-full font-medium text-xs hover:opacity-90 transition-opacity flex items-center gap-1.5">
                              Visit Site <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.githubLink && project.githubLink !== '#' && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-foreground/5 border border-border/30 text-foreground hover:bg-foreground/10 rounded-full font-medium text-xs transition-colors flex items-center gap-1.5">
                              View Code <GithubLogo weight="fill" className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Floating cursor image on hover (only when NOT expanded) */}
      {createPortal(
        <AnimatePresence>
          {hoveredProject && expandedIdx === null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -4, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.85, rotate: 4, filter: 'blur(8px)' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: springX, y: springY }}
            className="fixed top-0 left-0 pointer-events-none z-40 w-[350px] h-[200px] overflow-hidden shadow-olive-lift bg-surface hidden md:block rounded-xl"
          >
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
    </Section>
  );
}
