import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import React from 'react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  type: string;
}

interface ProjectCardProps {
  project: Project;
  isDark: boolean;
  index: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export default function ProjectCard({ project, isDark, index, onHoverStart, onHoverEnd }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`border-4 p-8 relative cursor-pointer transition-colors duration-300 ${isDark ? 'bg-gray-800 border-white' : 'bg-white border-black'}`}
      whileHover={{ scale: 1.02 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      <motion.div
        className="absolute -top-2 -left-2 px-2 py-1 border-2 border-black transform -rotate-12"
        animate={{ rotate: [-12, -18, -12] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        style={{ background: '#ffd700' }}
      >
        <span className="text-xs font-black text-black">NEW!</span>
      </motion.div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-2xl font-black mb-2 impact-title transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'}`}>
            {project.title}
          </h3>
          <div className={`inline-block px-3 py-1 border-2 text-sm font-black transition-colors duration-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-black text-black'}`}>
            {project.type}
          </div>
        </div>
        <ExternalLink className={`h-6 w-6 transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'}`} />
      </div>
      <p className={`mb-6 leading-relaxed font-medium transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-black'}`}>{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, techIndex) => (
          <motion.span
            key={techIndex}
            className={`px-3 py-1 border-2 text-xs font-black cursor-pointer transition-colors duration-300 ${isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'}`}
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
} 