import React, { memo, useMemo } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'motion/react';
import Section from '../Section';
import { portfolioData } from '../../data/portfolioData';

// Map skills to CDN icons
const skillIconMap = {
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  "Bash Scripting": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
  "Scikit-learn": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
  "TensorFlow": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg",
  "PyTorch": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg",
  "Computer Vision": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg",
  "NLP": "https://cdn.rawgit.com/devicons/devicon/master/icons/google/google-original.svg",
  "Pandas": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg",
  "NumPy": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg",
  "Power BI": "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
  "Excel": "/icons/excel.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  "Git": "/icons/git-icon.svg",
  "MLflow": "/icons/MLflow.svg",
  "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg",
  "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  "Jupyter": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original.svg",
  "Google Colab": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg",
  "Matplotlib": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original.svg",
  "Seaborn": "https://seaborn.pydata.org/_images/logo-mark-lightbg.svg"
};

// ─── Skill Pill (memoized to prevent unnecessary re-renders) ───
const SkillPill = memo(({ skill, isHovered, vertical = true }) => {
  const iconPath = skillIconMap[skill];
  return (
    <div className={`flex items-center gap-2.5 rounded-xl transition-[background-color] duration-300 ease-out group/pill hover:bg-foreground/5 cursor-default ${vertical ? 'px-4 py-3 w-full' : 'px-3 py-2 shrink-0'}`}>
      {iconPath ? (
        <div className="w-5 h-5 flex items-center justify-center shrink-0 group-hover/pill:scale-125 transition-transform duration-300 ease-out will-change-transform">
          <img
            src={iconPath}
            alt={skill}
            loading="lazy"
            className={`w-full h-full object-contain pointer-events-none transition-opacity duration-300 ease-out ${isHovered ? 'opacity-100' : 'opacity-50'} group-hover/pill:opacity-100`}
          />
        </div>
      ) : (
        <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-opacity duration-300 group-hover/pill:scale-150 ${isHovered ? 'bg-accent-matcha opacity-100' : 'bg-foreground/20'}`} />
      )}
      <span className={`text-sm font-sans transition-[color,opacity] duration-300 ease-out whitespace-nowrap ${isHovered ? 'text-foreground/80 opacity-100' : 'text-foreground/40'} group-hover/pill:text-foreground group-hover/pill:font-medium`}>
        {skill}
      </span>
    </div>
  );
});

// ─── Static skill block (extracted outside to avoid re-creation) ───
const SkillBlockVertical = memo(({ items, isHovered }) => (
  <div className="flex flex-col gap-4 pb-4">
    {items.map((skill, idx) => (
      <SkillPill key={`${skill}-${idx}`} skill={skill} isHovered={isHovered} vertical />
    ))}
  </div>
));

const SkillStripHorizontal = memo(({ items }) => (
  <div className="flex gap-2 pr-2">
    {items.map((skill, idx) => (
      <SkillPill key={`${skill}-${idx}`} skill={skill} isHovered={true} vertical={false} />
    ))}
  </div>
));

// ─── Desktop: Vertical Marquee Column ───
const VerticalMarqueeColumn = ({ category, items, direction = "up", baseSpeed = 12 }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const yPercent = useMotionValue(direction === "up" ? 0 : -25);
  const targetSpeedMultiplier = isHovered ? 0.12 : 1;
  const speedMultiplier = useSpring(1, { bounce: 0, duration: 600 });

  React.useEffect(() => {
    speedMultiplier.set(targetSpeedMultiplier);
  }, [isHovered, targetSpeedMultiplier, speedMultiplier]);

  useAnimationFrame((t, delta) => {
    const moveY = (delta / 1000) * (25 / baseSpeed) * speedMultiplier.get();
    let newY = yPercent.get() + (direction === "up" ? -moveY : moveY);
    if (direction === "up" && newY <= -25) newY += 25;
    if (direction === "down" && newY >= 0) newY -= 25;
    yPercent.set(newY);
  });

  const y = useTransform(yPercent, v => `${v}%`);

  return (
    <div
      className="flex flex-col gap-4 w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className={`text-xs md:text-sm ml-4 text-left font-medium shrink-0 pb-2 transition-colors duration-300 ${isHovered ? 'text-foreground/80' : 'text-foreground/40'}`}>
        {category}
      </h3>
      <div
        className="relative flex-1 min-h-0 w-full overflow-hidden touch-pan-x"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
        <motion.div
          className="absolute inset-x-0 top-0 flex flex-col w-full will-change-transform"
          style={{ y }}
        >
          <SkillBlockVertical items={items} isHovered={isHovered} />
          <SkillBlockVertical items={items} isHovered={isHovered} />
          <SkillBlockVertical items={items} isHovered={isHovered} />
          <SkillBlockVertical items={items} isHovered={isHovered} />
        </motion.div>
      </div>
    </div>
  );
};

// ─── Mobile: Horizontal Marquee Row ───
const HorizontalMarqueeRow = ({ category, items, direction = "left", baseSpeed = 18 }) => {
  const xPercent = useMotionValue(direction === "left" ? 0 : -25);

  useAnimationFrame((t, delta) => {
    const moveX = (delta / 1000) * (25 / baseSpeed);
    let newX = xPercent.get() + (direction === "left" ? -moveX : moveX);
    if (direction === "left" && newX <= -25) newX += 25;
    if (direction === "right" && newX >= 0) newX -= 25;
    xPercent.set(newX);
  });

  const x = useTransform(xPercent, v => `${v}%`);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-medium text-foreground/40 px-1">
        {category}
      </h3>
      <div
        className="relative w-full overflow-hidden h-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
        }}
      >
        <motion.div
          className="absolute top-0 left-0 flex h-full items-center will-change-transform"
          style={{ x }}
        >
          <SkillStripHorizontal items={items} />
          <SkillStripHorizontal items={items} />
          <SkillStripHorizontal items={items} />
          <SkillStripHorizontal items={items} />
        </motion.div>
      </div>
    </div>
  );
};

export default function Skills() {
  const { skills } = portfolioData;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <Section id="skills" title="Tech Stack">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-10 md:mt-16 w-full"
      >
        {/* Desktop: Vertical 5-column marquee */}
        <div className="hidden md:grid grid-cols-5 gap-4 w-full max-w-5xl mx-auto h-[350px]">
          {Object.entries(skills).map(([category, items], idx) => (
            <VerticalMarqueeColumn
              key={category}
              category={category}
              items={items}
              direction={idx % 2 === 0 ? "up" : "down"}
              baseSpeed={10 + (idx * 1.5)}
            />
          ))}
        </div>

        {/* Mobile: Horizontal stacked marquee rows */}
        <div className="flex flex-col gap-4 md:hidden">
          {Object.entries(skills).map(([category, items], idx) => (
            <HorizontalMarqueeRow
              key={category}
              category={category}
              items={items}
              direction={idx % 2 === 0 ? "left" : "right"}
              baseSpeed={15 + (idx * 2)}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  );
}