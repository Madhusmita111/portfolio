import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';
import { LinkedinLogo, GithubLogo, EnvelopeSimple, FileText, X, DownloadSimple } from '@phosphor-icons/react';

function SocialButton({ href, icon: Icon, label, bgClass, onClick }) {
  const Component = onClick ? motion.button : motion.a;
  const isMail = href && href.startsWith('mailto');
  
  return (
    <Component
      href={onClick ? undefined : href}
      target={onClick || isMail ? undefined : '_blank'}
      rel={onClick || isMail ? undefined : 'noopener noreferrer'}
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[13px] font-medium shadow-sm cursor-pointer transition-opacity hover:opacity-90 ${bgClass}`}
    >
      <Icon weight="fill" className="w-4 h-4" />
      <span>{label}</span>
    </Component>
  );
}

const Highlight = ({ colorClass, children }) => (
  <span className="relative inline-block px-1 mx-0.5 transition-colors duration-300 z-10 group-hover:text-neutral-950 dark:group-hover:text-neutral-50">
    <span className={`absolute inset-x-0 bottom-0 h-[3px] ${colorClass} transition-all duration-300 ease-out group-hover:h-full -z-10 rounded-sm opacity-70 group-hover:opacity-100`}></span>
    <span className="relative z-10 flex items-center gap-1.5 font-medium">{children}</span>
  </span>
);

const RoleText = ({ role, currentKey }) => {
  return (
    <motion.p
      key={currentKey}
      className="text-lg md:text-xl font-medium italic whitespace-nowrap absolute flex tracking-tight"
      style={{ color: 'var(--ink-blue)' }}
    >
      {role.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}-${currentKey}`}
          initial={{ y: 80, opacity: 0, rotateX: -90, filter: 'blur(4px)' }}
          animate={{ y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
          exit={{ y: -80, opacity: 0, rotateX: 90, filter: 'blur(12px)' }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: i * 0.02
          }}
          style={{ transformOrigin: "50% 50% -10px" }}
          className={char === ' ' ? 'w-[0.3em]' : 'inline-block will-change-transform'}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
};

/* ── CV Modal ── */
function CVModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cv-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-3xl bg-background border border-border/50 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[85vh] md:h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/40 shrink-0 bg-background/80 backdrop-blur-sm">
              <h3 className="text-lg font-heading tracking-tight" style={{ color: 'var(--ink-blue)' }}>
                Resume
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href="/pdf/MadhusmitaCV.pdf"
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-btn-resume text-white text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  <DownloadSimple weight="bold" className="w-3.5 h-3.5" />
                  Download
                </a>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-surface hover:bg-foreground/5 flex items-center justify-center text-foreground/60 hover:text-foreground transition-all shrink-0 border border-border/60"
                >
                  <X weight="bold" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 w-full bg-surface/30 p-2 md:p-4 overflow-hidden">
              <iframe
                src="/pdf/MadhusmitaCV.pdf"
                title="Resume"
                className="w-full h-full rounded-lg border border-border/40 bg-white"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function Hero() {
  const { hero } = portfolioData;
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [showCV, setShowCV] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % hero.roles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [hero.roles.length]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 100, damping: 20 }
    }
  };

  return (
    <>
      <section className="relative flex flex-col items-start justify-center w-full pt-8 md:pt-4 pb-4 md:pb-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 w-full"
        >
          {/* Avatar */}
          <motion.div variants={item} className="mb-2 flex items-center cursor-default">
            <div className="relative shrink-0">
              <img
                src={hero.avatar}
                alt={hero.name}
                className="relative z-10 w-24 h-24 rounded-full object-cover shadow-sm bg-surface ring-1 ring-border"
              />
            </div>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-heading tracking-tight" style={{ color: 'var(--ink-blue)' }}>
              {hero.name}
            </h1>
            <div className="h-7 md:h-8 relative overflow-hidden flex items-center w-full perspective-[1000px] mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
              <AnimatePresence mode="popLayout">
                <RoleText
                  key={currentRoleIndex}
                  role={hero.roles[currentRoleIndex]}
                  currentKey={currentRoleIndex}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div variants={item} className="group text-[15px] text-muted leading-relaxed mt-2 font-normal cursor-default relative z-20 max-w-xl">
            I am a Computer Science student focused on {' '}
            <Highlight colorClass="bg-indigo-400">Data Science</Highlight> and {' '}
            <Highlight colorClass="bg-purple-400">Machine Learning</Highlight>, with experience in {' '}
            <Highlight colorClass="bg-blue-400">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" className="w-[16px] h-[16px] relative -top-px inline-block" /> Python
            </Highlight>, {' '}
            <Highlight colorClass="bg-emerald-400">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" alt="SQL" className="w-[16px] h-[16px] relative -top-px inline-block" /> SQL
            </Highlight>, and {' '}
            <Highlight colorClass="bg-sky-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" alt="C++" className="w-[16px] h-[16px] relative -top-px inline-block" /> C++
            </Highlight>. I build {' '}
            <span className="font-medium text-foreground">predictive models</span>, {' '}
            <span className="font-medium text-foreground">data pipelines</span>, and {' '}
            <span className="font-medium text-foreground">automation systems</span> that turn complex datasets into practical insights and scalable solutions.
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-2.5 mt-4">
            <SocialButton onClick={() => setShowCV(true)} icon={FileText} label="Resume" bgClass="bg-btn-resume text-white" />

            {hero.linkedin && (
              <SocialButton href={hero.linkedin} icon={LinkedinLogo} label="LinkedIn" bgClass="bg-btn-linkedin text-white" />
            )}
            {hero.github && (
              <SocialButton href={hero.github} icon={GithubLogo} label="GitHub" bgClass="bg-btn-github text-white" />
            )}
            {hero.email && (
              <SocialButton href={`mailto:${hero.email}`} icon={EnvelopeSimple} label="Email" bgClass="bg-btn-email text-white" />
            )}
          </motion.div>
        </motion.div>
      </section>

      <CVModal isOpen={showCV} onClose={() => setShowCV(false)} />
    </>
  );
}
