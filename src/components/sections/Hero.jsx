import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, AnimatePresence } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';
import { LinkedinLogo, GithubLogo, EnvelopeSimple, Copy, Check, Link as LinkIcon } from '@phosphor-icons/react';

function SocialButton({ href, icon: Icon, label, bgClass }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 px-3.5 py-2 text-white rounded-full text-[13px] font-medium shadow-sm cursor-pointer transition-opacity hover:opacity-90 ${bgClass}`}
    >
      <Icon weight="fill" className="w-4 h-4" />
      <span>{label}</span>
    </motion.a>
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

function UrlCopyBar() {
  const [copied, setCopied] = useState(false);
  const siteUrl = "madhufolio.vercel.app";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://${siteUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = `https://${siteUrl}`;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      aria-label={copied ? "Copied to clipboard" : "Copy site URL"}
      className="group relative flex w-full md:w-auto items-center justify-between rounded-full bg-foreground/5 py-2 pl-4 pr-2 font-sans text-sm transition-colors hover:bg-foreground/8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="shrink-0 text-foreground/40">
          <LinkIcon className="h-4 w-4" />
        </span>
        <span className="truncate font-medium tracking-tight text-foreground/50 font-mono text-xs">
          {siteUrl}
        </span>
      </div>

      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ml-3 transition-colors duration-300 cursor-pointer ${
          copied 
            ? 'bg-emerald-500/15 text-emerald-600' 
            : 'bg-foreground/5 text-foreground/40 group-hover:text-foreground/70'
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
            >
              <Check weight="bold" className="h-3.5 w-3.5" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15 }}
            >
              <Copy weight="bold" className="h-3.5 w-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

export default function Hero() {
  const { hero } = portfolioData;

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

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
    <section className="relative flex flex-col items-start justify-center w-full pt-16 md:pt-4 pb-8 md:pb-16">

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-5 w-full"
      >
        {/* Top status bar */}
        <motion.div variants={item} className="flex items-center gap-4 text-xs text-muted-light font-mono">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-surface/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for work
          </span>
          <span className="hidden sm:inline text-muted-light/60">{hero.location}</span>
        </motion.div>

        <motion.div variants={item} className="mb-2 relative">
          <img
            src={hero.avatar}
            alt={hero.name}
            className="relative z-10 w-24 h-24 rounded-full object-cover shadow-sm bg-surface ring-1 ring-border"
          />
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
          {hero.linkedin && (
            <SocialButton href={hero.linkedin} icon={LinkedinLogo} label="LinkedIn" bgClass="bg-[#0A66C2]" />
          )}
          {hero.github && (
            <SocialButton href={hero.github} icon={GithubLogo} label="GitHub" bgClass="bg-neutral-800 dark:bg-neutral-700" />
          )}
          {hero.email && (
            <SocialButton href={`mailto:${hero.email}`} icon={EnvelopeSimple} label="Email" bgClass="bg-[var(--ink-blue)]" />
          )}

          <UrlCopyBar />
        </motion.div>
      </motion.div>
    </section>
  );
}
