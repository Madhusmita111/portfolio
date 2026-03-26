import React from 'react';
import { motion } from 'motion/react';
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

function SkillItem({ skill }) {
  const iconPath = skillIconMap[skill];
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-foreground/5 dark:hover:bg-foreground/10 transition-colors cursor-default">
      {iconPath ? (
        <img
          src={iconPath}
          alt={skill}
          loading="lazy"
          className="w-4 h-4 object-contain opacity-70"
        />
      ) : (
        <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
      )}
      <span className="text-sm text-foreground/70 whitespace-nowrap">
        {skill}
      </span>
    </div>
  );
}

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <Section id="skills" title="Tech Stack">
      <div className="flex flex-col gap-6 pt-2">
        {Object.entries(skills).map(([category, items], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="flex flex-col gap-2"
          >
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-light">
              {category}
            </h3>
            <div className="flex flex-wrap gap-1">
              {items.map((skill, i) => (
                <SkillItem key={`${skill}-${i}`} skill={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}