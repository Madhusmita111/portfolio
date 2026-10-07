import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import { ArrowUpRight, GithubLogo, X, Database, Sparkle, ShieldCheck, ChartLineUp, Cpu, Code, ArrowRight } from '@phosphor-icons/react';

// Tech Icon Mapper
const getTechIcon = (tech) => {
  const map = {
    'python': 'python/python-original.svg',
    'flask': 'flask/flask-original.svg',
    'fastapi': 'fastapi/fastapi-original.svg',
    'scikit-learn': 'scikitlearn/scikitlearn-original.svg',
    'pandas': 'pandas/pandas-original.svg',
    'numpy': 'numpy/numpy-original.svg',
    'javascript': 'javascript/javascript-original.svg',
    'html/css': 'html5/html5-original.svg',
    'matplotlib': 'matplotlib/matplotlib-original.svg',
    'c++': 'cplusplus/cplusplus-original.svg',
    'docker': 'docker/docker-original.svg',
    'kubernetes': 'kubernetes/kubernetes-plain.svg',
    'apache kafka': 'apachekafka/apachekafka-original.svg',
    'kafka': 'apachekafka/apachekafka-original.svg',
    'apache spark': 'apachespark/apachespark-original.svg',
    'spark': 'apachespark/apachespark-original.svg',
    'apache iceberg': 'apache/apache-original.svg',
    'iceberg': 'apache/apache-original.svg',
    'terraform': 'terraform/terraform-original.svg',
    'react': 'react/react-original.svg',
    'figma': 'figma/figma-original.svg',
    'postgresql': 'postgresql/postgresql-original.svg',
    'xgboost': 'python/python-original.svg',
    'langchain': 'python/python-original.svg'
  };
  const key = tech.toLowerCase();
  return map[key] ? `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${map[key]}` : null;
};


const ProjectIcon = ({ iconType }) => {
  switch (iconType) {
    case 'Database': return <Database weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
    case 'Sparkle': return <Sparkle weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
    case 'ShieldCheck': return <ShieldCheck weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
    case 'ChartLineUp': return <ChartLineUp weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
    case 'Cpu': return <Cpu weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
    default: return <Code weight="duotone" className="w-5 h-5 text-ink dark:text-ink-light" />;
  }
};

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
            className="relative z-10 w-full max-w-2xl bg-background border border-border rounded-xl overflow-hidden shadow-2xl dark:shadow-black/50 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 md:py-5 border-b border-border/40 shrink-0 bg-background/80 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-ink/10 dark:bg-ink-light/10 border border-ink/20 flex items-center justify-center shrink-0">
                  <ProjectIcon iconType={project.iconType} />
                </div>
                <h3 className="text-xl md:text-2xl font-heading tracking-tight" style={{ color: 'var(--ink-blue)' }}>
                  {project.title}
                </h3>
              </div>
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

              {/* Project Summary Box (Picture removed) */}
              {project.summary && (
                <div className="p-4 rounded-xl bg-surface border border-border/50 text-[14px] md:text-[15px] text-foreground/85 leading-relaxed font-normal">
                  {project.summary}
                </div>
              )}

              {/* Bullet Points Description */}
              <div className="flex flex-col gap-3 pt-1">
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

/* ── Project Card (Picture-free, inspired by bengregoryjohn.in) ── */
function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(project)}
      className="group relative rounded-xl bg-card hover:bg-card-hover border border-card-border hover:border-card-border-hover transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-ink/5"
    >
      {/* Top subtle accent stripe */}
      <div className="h-1 w-full bg-gradient-to-r from-ink/30 via-ink to-ink/30 opacity-40 group-hover:opacity-100 transition-opacity" />

      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-5">
        <div>
          {/* Header row: Icon & Date Pill */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-ink/10 dark:bg-ink-light/10 border border-ink/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <ProjectIcon iconType={project.iconType} />
            </div>
            <span className="text-xs font-mono text-muted-light bg-surface px-2.5 py-1 rounded-full border border-border/40">
              {project.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-foreground group-hover:text-ink dark:group-hover:text-ink-light transition-colors mb-2">
            {project.title}
          </h3>

          {/* 1-2 sentence description */}
          <p className="text-sm text-muted leading-relaxed font-normal line-clamp-3">
            {project.summary || (project.points && project.points[0])}
          </p>
        </div>

        <div>
          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 mb-5 pt-1">
            {project.tech.slice(0, 5).map((t, i) => {
              const iconUrl = getTechIcon(t);
              return (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-md bg-surface border border-border/40 text-foreground/75"
                >
                  {iconUrl && (
                    <img src={iconUrl} alt="" className="w-3 h-3 object-contain inline-block" />
                  )}
                  {t}
                </span>
              );
            })}
            {project.tech.length > 5 && (
              <span className="text-[11px] font-medium px-2 py-1 rounded-md bg-surface border border-border/40 text-muted-light">
                +{project.tech.length - 5}
              </span>
            )}
          </div>

          {/* Card footer links */}
          <div className="pt-3 border-t border-border/30 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3">
              {project.githubLink && project.githubLink !== '#' && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 font-medium text-muted hover:text-foreground transition-colors"
                >
                  <GithubLogo weight="fill" className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>
              )}
              {project.liveLink && project.liveLink !== '#' && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 font-medium text-muted hover:text-foreground transition-colors"
                >
                  <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
                  <span>Live</span>
                </a>
              )}
            </div>

            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-light group-hover:text-ink dark:group-hover:text-ink-light transition-colors">
              Details <ArrowRight weight="bold" className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
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
