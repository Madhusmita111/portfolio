import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { portfolioData } from '../../data/portfolioData';
import { LinkedinLogo, GithubLogo, EnvelopeSimple, Copy, CheckIcon, LinkIcon } from '@phosphor-icons/react';

function MagneticSocialButton({ href, icon: Icon, bgClass, children }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 400, damping: 20 });
  const y = useSpring(0, { stiffness: 400, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`flex items-center gap-2 px-2.5 py-2.5 text-white rounded-full font-medium text-sm shadow-sm cursor-pointer ${bgClass}`}
    >
      <Icon weight="fill" className="w-4 h-4" />
      {children}
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
      className="text-xl md:text-2xl text-accent-matcha font-medium italic whitespace-nowrap absolute flex tracking-tight"
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
      // Fallback
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
  className="group relative flex w-1/2 items-center justify-between rounded-full bg-foreground/5 py-2 pl-4 pr-2 font-sans text-sm transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
>
  {/* Left: Icon + Text Label */}
  <div className="flex items-center gap-3 overflow-hidden">
    <span className="shrink-0 text-foreground/40">
      <LinkIcon className="h-4 w-4" />
    </span>
    <span className="truncate font-medium tracking-tight text-foreground/60">
      {siteUrl}
    </span>
  </div>

  {/* Right: Feedback Circle */}
  <div
    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
      copied 
        ? 'bg-emerald-500/15 text-emerald-600' 
        : 'bg-foreground/5 text-foreground/40 group-hover:text-foreground/80'
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
          <CheckIcon weight="bold" className="h-4 w-4" />
        </motion.div>
      ) : (
        <motion.div
          key="copy"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15 }}
        >
          <Copy weight="bold" className="h-4 w-4" />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</motion.button>
  );
}

export default function Hero() {
  const { hero, about } = portfolioData;

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
        className="flex flex-col gap-6 max-w-3xl"
      >
        <motion.div variants={item} className="mb-2 relative">
          <img
            src={hero.avatar}
            alt={hero.name}
            className="relative z-10 w-30 h-30 rounded-full object-cover shadow-lg bg-surface ring-2 ring-white"
          />
        </motion.div>

        <motion.div variants={item} className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground">
            {hero.name}
          </h1>
          <div className="h-8 md:h-10 relative overflow-hidden flex items-center w-full perspective-[1000px] mask-[linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <AnimatePresence mode="popLayout">
              <RoleText
                key={currentRoleIndex}
                role={hero.roles[currentRoleIndex]}
                currentKey={currentRoleIndex}
              />
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={item} className="group text-base md:text-md text-muted leading-loose mt-2 font-light cursor-default relative z-20">
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

        <motion.div variants={item} className="flex flex-wrap items-center gap-3 mt-6">
          {hero.linkedin && (
            <MagneticSocialButton href={hero.linkedin} icon={LinkedinLogo} bgClass="bg-sky-600 hover:bg-sky-600/90" />
          )}
          {hero.github && (
            <MagneticSocialButton href={hero.github} icon={GithubLogo} bgClass="bg-neutral-950 hover:bg-neutral-900/90" />
          )}
          {hero.email && (
            <MagneticSocialButton href={`mailto:${hero.email}`} icon={EnvelopeSimple} bgClass="bg-accent-olive hover:bg-accent-olive/90" />
          )}

          <UrlCopyBar />
        </motion.div>
      </motion.div>
    </section>
  );
}
