import React, { useRef, useState } from 'react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';

const skillIconMap = {
  'Python': '/icons/Python.svg',
  'SQL': '/icons/sql.svg',
  'Pandas': '/icons/Pandas.svg',
  'NumPy': '/icons/NumPy.svg',
  'Power BI': '/icons/power-bi.svg',
  'Excel': '/icons/excel.svg',
  'Matplotlib': '/icons/Matplotlib.svg',
  'Seaborn': '/icons/seaborn.svg',
  'Colab': '/icons/colab.svg',
  'Git': '/icons/git-icon.svg',
  'Jupyter': '/icons/Jupyter.svg',
};

function RepulsiveSkillPill({ item, iconPath, pointerX, pointerY, pointerActive, index }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const intensity = useMotionValue(0);

  const x = useSpring(targetX, { stiffness: 210, damping: 20, mass: 0.8 });
  const y = useSpring(targetY, { stiffness: 210, damping: 20, mass: 0.8 });
  const glowOpacity = useSpring(intensity, { stiffness: 180, damping: 22 });

  const scale = useTransform(glowOpacity, [0, 1], [1, 1.055]);
  const rotate = useTransform(x, [-36, 36], [-6, 6]);
  const iconAlpha = useTransform(glowOpacity, [0, 1], [1, 1]);
  const labelAlpha = useTransform(glowOpacity, [0, 1], [0.72, 1]);

  useAnimationFrame((t) => {
    if (shouldReduceMotion) {
      targetX.set(0);
      targetY.set(0);
      intensity.set(0);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const wobbleX = Math.sin(t / 1100 + index * 1.31) * 1.4;
    const wobbleY = Math.cos(t / 1400 + index * 0.93) * 1.2;

    if (!pointerActive) {
      targetX.set(wobbleX);
      targetY.set(wobbleY);
      intensity.set(0);
      return;
    }

    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = centerX - pointerX.get();
    const dy = centerY - pointerY.get();
    const distance = Math.hypot(dx, dy);

    const radius = 185;
    const maxPush = 34;

    if (distance < radius && distance > 0.01) {
      const normX = dx / distance;
      const normY = dy / distance;
      const force = ((radius - distance) / radius) ** 1.8;
      const push = force * maxPush;

      targetX.set(normX * push + wobbleX * 0.6);
      targetY.set(normY * push + wobbleY * 0.6);
      intensity.set(Math.min(force * 1.25, 1));
      return;
    }

    targetX.set(wobbleX);
    targetY.set(wobbleY);
    intensity.set(0);
  });

  return (
    <motion.div
      ref={ref}
      style={{ x, y, scale, rotate }}
      className="group relative px-2.5 py-2 sm:px-3 sm:py-3 flex items-center gap-2 sm:gap-4 rounded-2xl bg-surface/80 backdrop-blur-md shadow-olive-soft cursor-default will-change-transform"
    >
      <motion.div
        aria-hidden
        style={{ opacity: glowOpacity }}
        className="absolute inset-0 rounded-2xl"
      >
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(130%_130%_at_50%_0%,var(--glow-matcha-soft),var(--glow-clear))]" />
        <div className="absolute -inset-px rounded-2xl border border-border-accent-medium/70" />
      </motion.div>

      {iconPath ? (
        <motion.div
          style={{ opacity: iconAlpha }}
          className="w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center shrink-0 "
        >
          <img src={iconPath} alt={item} className="w-full h-full object-contain pointer-events-none" />
        </motion.div>
      ) : (
        <div className="relative flex items-center justify-center shrink-0">
          <motion.span
            style={{ opacity: iconAlpha }}
            className="absolute w-2.5 h-2.5 rounded-full bg-accent-matcha/30 scale-150"
          />
          <span className="relative z-10 w-1.5 h-1.5 rounded-full bg-accent-olive/80" />
        </div>
      )}

      <motion.span
        style={{ opacity: labelAlpha }}
        className="text-xs sm:text-sm md:text-base font-sans font-light tracking-wide text-foreground truncate"
      >
        {item}
      </motion.span>
    </motion.div>
  );
}

export default function Skills() {
  const { skills } = portfolioData;
  const shouldReduceMotion = useReducedMotion();
  const [pointerActive, setPointerActive] = useState(false);
  const [localPointer, setLocalPointer] = useState({ x: -999, y: -999 });

  const pointerX = useMotionValue(-9999);
  const pointerY = useMotionValue(-9999);
  const orbX = useSpring(0, { stiffness: 130, damping: 22 });
  const orbY = useSpring(0, { stiffness: 130, damping: 22 });
  const orbOpacity = useSpring(0, { stiffness: 140, damping: 25 });

  const allSkills = Object.values(skills).flat();
  const uniqueSkills = [...new Set(allSkills)];

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX);
    pointerY.set(event.clientY);
    setLocalPointer({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    setPointerActive(true);
    orbX.set(event.clientX - rect.left - 112);
    orbY.set(event.clientY - rect.top - 112);
    orbOpacity.set(1);
  };

  const resetPointerField = () => {
    setPointerActive(false);
    orbOpacity.set(0);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.9
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 16
      }
    }
  };

  return (
    <Section id="skills" title="Skills">
      <div
        className="relative mt-12 md:mt-20 rounded-3xl glass-matcha-panel p-5 md:p-8 overflow-hidden"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointerField}
        onPointerCancel={resetPointerField}
      >
        {!shouldReduceMotion && (
          <>
            <motion.div
              aria-hidden
              style={{ x: orbX, y: orbY, opacity: orbOpacity }}
              className="pointer-events-none absolute w-56 h-56 rounded-full blur-2xl bg-[radial-gradient(circle,var(--glow-matcha-medium),var(--glow-clear))]"
            />
            <motion.div
              aria-hidden
              initial={false}
              animate={{
                x: localPointer.x > 0 ? localPointer.x - 240 : -220,
                y: localPointer.y > 0 ? localPointer.y - 110 : -120,
              }}
              transition={{ type: 'spring', stiffness: 70, damping: 24 }}
              className="pointer-events-none absolute w-80 h-28 rounded-full blur-xl bg-[radial-gradient(circle,var(--glow-matcha-trail),var(--glow-clear))]"
            />
          </>
        )}

        <motion.div
          className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {uniqueSkills.map((skill, idx) => (
            <motion.div key={skill} variants={itemVariants}>
              <RepulsiveSkillPill
                item={skill}
                iconPath={skillIconMap[skill]}
                pointerX={pointerX}
                pointerY={pointerY}
                pointerActive={pointerActive}
                index={idx}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}