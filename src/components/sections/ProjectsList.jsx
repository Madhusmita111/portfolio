import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import { ArrowUpRight, GithubLogo, X } from '@phosphor-icons/react';

// Tech Icon Mapper
const getTechIcon = (tech) => {
  const map = {
    'python': 'python/python-original.svg',
    'flask': 'flask/flask-original.svg',
    'scikit-learn': 'scikitlearn/scikitlearn-original.svg',
    'pandas': 'pandas/pandas-original.svg',
    'numpy': 'numpy/numpy-original.svg',
    'javascript': 'javascript/javascript-original.svg',
    'html/css': 'html5/html5-original.svg',
    'matplotlib': 'matplotlib/matplotlib-original.svg',
    'c++': 'cplusplus/cplusplus-original.svg',
    'xgboost': 'python/python-original.svg' // fallback
  };
  const key = tech.toLowerCase();
  return map[key] ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${map[key]}` : null;
};

// Component for a single overlapping tech icon
const TechIconPill = ({ tech, index }) => {
  const iconUrl = getTechIcon(tech);
  const initials = tech.substring(0, 1).toUpperCase();

  return (
    <motion.div
      variants={{
        initial: { y: 0 },
        hover: { y: -4, transition: { type: "spring", stiffness: 400, damping: 12, delay: index * 0.05 } }
      }}
      className="w-6 h-6 rounded-full border-2 border-background bg-surface/80 flex items-center justify-center shrink-0 overflow-hidden relative shadow-sm"
      style={{ zIndex: 10 - index }}
      title={tech}
    >
      {iconUrl ? (
        <img src={iconUrl} alt={tech} className="w-3.5 h-3.5 object-contain" />
      ) : (
        <span className="text-[9px] font-bold text-muted">{initials}</span>
      )}
    </motion.div>
  );
};

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
          className="fixed z-50 pointer-events-none w-auto max-w-[280px] p-3.5 rounded-xl bg-surface text-foreground shadow-lg border border-surface/10"
        >
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {project.tech.map((t, i) => (
              <span key={i} className="text-[10px] font-medium bg-foreground/5 px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
          <p className="text-[11px] opacity-50 text-center font-medium whitespace-nowrap">Click card to view details</p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ── Project Modal (Geist Design) ── */
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
          className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal Structure */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl bg-background border border-border/50 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 md:py-5 border-b border-border/40 shrink-0 bg-background/80 backdrop-blur-md">
              <h3 className="text-xl md:text-2xl font-heading tracking-tight" style={{ color: 'var(--ink-blue)' }}>
                {project.title}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-surface hover:bg-foreground/5 flex items-center justify-center text-foreground/60 hover:text-foreground transition-all shrink-0 ml-4 border border-border/60"
              >
                <X weight="bold" className="w-4 h-4" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex flex-col gap-6 p-6 md:p-8 overflow-y-auto w-full">
              
              {/* Info Row (Date & Tech Tags) */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <span className="text-sm text-muted-light font-mono shrink-0">{project.date}</span>
                
                <div className="flex flex-wrap gap-2 md:justify-end">
                  {project.tech.map((t, i) => {
                    const iconUrl = getTechIcon(t);
                    return (
                      <div key={i} className="flex items-center gap-1.5 bg-foreground/5 pl-1.5 pr-2.5 py-1 rounded-full border border-border/30">
                        {iconUrl ? (
                           <img src={iconUrl} alt={t} className="w-3.5 h-3.5 object-contain" />
                        ) : (
                           <span className="w-3.5 h-3.5 rounded-full bg-foreground/10 flex items-center justify-center text-[8px] font-bold text-muted">
                             {t.charAt(0)}
                           </span>
                        )}
                        <span className="text-[11px] font-medium text-muted">{t}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="w-full aspect-video md:aspect-[2/1] rounded-lg md:rounded-xl overflow-hidden border border-border/40 bg-surface/50 shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bullet Points Description */}
              <div className="flex flex-col gap-3 pt-2">
                {project.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 w-full">
                    <span className="mt-[9px] w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'var(--ink-blue)' }} />
                    <p className="text-[14px] md:text-[15px] text-foreground/80 leading-relaxed font-normal">{point}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Actions Footer */}
            <div className="flex items-center gap-3 p-5 md:px-8 border-t border-border/40 bg-surface/30 shrink-0 select-none">
              {project.liveLink && project.liveLink !== '#' && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Visit Site <ArrowUpRight weight="bold" className="w-4 h-4" />
                </a>
              )}
              {project.githubLink && project.githubLink !== '#' && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 border border-border/60 text-foreground/70 hover:text-foreground hover:border-border-heavy rounded-full text-sm font-medium transition-all"
                >
                  View Code <GithubLogo weight="fill" className="w-4 h-4" />
                </a>
              )}
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
  const [hoveredTech, setHoveredTech] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMoveTech = (e) => {
    setTooltipPos({ x: e.clientX + 16, y: e.clientY + 16 });
  };

  return (
    <>
      <motion.div
        ref={cardRef}
        initial="initial"
        whileInView="inView"
        whileHover="hover"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          initial: { opacity: 0, y: 20 },
          inView: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] } },
        }}
        onClick={() => onClick(project)}
        className="group relative rounded-lg bg-surface/30 hover:bg-surface/60 border border-border/30 hover:border-border/60 transition-colors duration-300 overflow-visible cursor-pointer flex flex-col"
      >
        <div className="w-full h-48 overflow-hidden bg-surface rounded-lg shrink-0 relative shadow-md shadow-foreground/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          />
        </div>

        <div className="px-4 py-3 flex items-center justify-between gap-3 min-h-[56px] overflow-hidden rounded-lg shadow-sm shadow-foreground/5">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="text-[15px] font-semibold tracking-tight text-foreground/90 group-hover:text-foreground leading-snug truncate relative inline-block max-w-full">
              {project.title}
            </h3>
          </div>
          
          <div 
             className="flex -space-x-2 shrink-0 pr-1 py-1"
             onMouseEnter={(e) => { e.stopPropagation(); setHoveredTech(true); }}
             onMouseLeave={(e) => { e.stopPropagation(); setHoveredTech(false); }}
             onMouseMove={(e) => { e.stopPropagation(); handleMouseMoveTech(e); }}
          >
            {project.tech.slice(0, 4).map((t, i) => (
               <TechIconPill key={i} tech={t} index={i} />
            ))}
            {project.tech.length > 4 && (
               <motion.div
                  variants={{
                    initial: { y: 0 },
                    hover: { y: -4, transition: { type: "spring", stiffness: 400, damping: 12, delay: 4 * 0.05 } }
                  }}
                  className="w-6 h-6 rounded-full border-2 border-background bg-border/40 flex items-center justify-center shrink-0 z-0 relative shadow-sm"
               >
                 <span className="text-[9px] font-bold text-muted">+{project.tech.length - 4}</span>
               </motion.div>
            )}
           </div>
        </div>
      </motion.div>

      <ProjectTooltip
        project={project}
        x={tooltipPos.x}
        y={tooltipPos.y}
        visible={hoveredTech}
      />
    </>
  );
}

/* ── Projects Section ── */
export default function ProjectsList() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState(null);

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedProject]);

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
