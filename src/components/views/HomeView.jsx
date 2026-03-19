import React from 'react';
import { motion } from 'motion/react';
import Hero from '../sections/Hero';
import ProjectsList from '../sections/ProjectsList';
import Resume from '../sections/Resume';
import Skills from '../sections/Skills';
import Certificates from '../sections/Certificates';

export default function HomeView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-20 md:gap-28 w-full pb-16"
    >
      <Hero />
      <ProjectsList />
      <Skills />
      <Resume />
      <Certificates />
    </motion.div>
  );
}
