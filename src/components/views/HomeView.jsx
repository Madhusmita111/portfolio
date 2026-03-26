import React from 'react';
import { motion } from 'motion/react';
import Hero from '../sections/Hero';
import ProjectsList from '../sections/ProjectsList';
import Resume from '../sections/Resume';
import Skills from '../sections/Skills';
import Certificates from '../sections/Certificates';
import Achievements from '../sections/Achievements';
import Contact from '../sections/Contact';
import Separator from '../Separator';

export default function HomeView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-20 md:gap-32 w-full pb-20"
    >
      <Hero />
      <Separator showHint />
      <ProjectsList />
      <Skills />
      <Resume />
      <Achievements />
      <Certificates />
      <Contact />
    </motion.div>
  );
}
