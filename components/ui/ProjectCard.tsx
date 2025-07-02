import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import React, { useMemo } from 'react';
import MangaMascot from "./MangaMascot";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  type: string;
  url?: string;
  mascotImage?: string;
  mascotComment?: string;
  detailedDescription?: string;
}

interface ProjectCardProps {
  project: Project;
  isDark: boolean;
  index: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  currentIndex?: number;
  total?: number;
}

interface MangaPageFlipProps {
  isActive: boolean;
  direction: 'left' | 'right';
  children: React.ReactNode;
}

const BUBBLES = [
  { text: 'Incroyable!', style: { top: -32, right: 12, rotate: 8 } },
  { text: 'Check!', style: { bottom: -28, left: 18, rotate: -10 } },
  { text: 'Nouveau!', style: { top: 24, left: -36, rotate: -14 } },
  { text: 'Testé!', style: { bottom: 10, right: -30, rotate: 12 } },
  { text: 'Manga Power!', style: { top: 60, left: '50%', transform: 'translateX(-50%)', rotate: 3 } },
];

export function MangaPageFlip({ isActive, direction, children }: MangaPageFlipProps) {
  // Animation avancée pour effet page manga
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isActive ? 'active' : 'inactive'}
        initial={{
          rotateY: direction === 'left' ? -120 : 120,
          scaleX: 0.85,
          skewY: direction === 'left' ? 8 : -8,
          opacity: 0,
        }}
        animate={{
          rotateY: 0,
          scaleX: 1,
          skewY: 0,
          opacity: 1,
          boxShadow: isActive
            ? '0 0 0 8px #000, 0 16px 48px 0 rgba(0,0,0,0.5)'
            : '0 0 0 4px #000, 0 4px 16px 0 rgba(0,0,0,0.2)',
        }}
        exit={{
          rotateY: direction === 'left' ? 120 : -120,
          scaleX: 0.85,
          skewY: direction === 'left' ? -8 : 8,
          opacity: 0,
        }}
        transition={{ duration: 1, ease: [0.77, 0, 0.175, 1] }}
        style={{
          perspective: 2000,
          border: '6px solid black',
          borderRadius: 16,
          background: 'white',
          position: 'relative',
          overflow: 'visible',
          minHeight: 420,
          minWidth: 320,
          boxSizing: 'border-box',
        }}
        className="manga-flip-container shadow-2xl"
      >
        {/* Texture papier */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{
          background: 'repeating-linear-gradient(135deg, #f8f8f8 0 2px, #fff 2px 8px)',
          opacity: 0.25,
          borderRadius: 16,
        }} />
        {/* Ombre dynamique */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          initial={{
            background:
              direction === 'left'
                ? 'linear-gradient(90deg, rgba(0,0,0,0.18) 0%, transparent 60%)'
                : 'linear-gradient(270deg, rgba(0,0,0,0.18) 0%, transparent 60%)',
            opacity: 0.7,
          }}
          animate={{
            background:
              direction === 'left'
                ? 'linear-gradient(90deg, transparent 40%, rgba(0,0,0,0.18) 100%)'
                : 'linear-gradient(270deg, transparent 40%, rgba(0,0,0,0.18) 100%)',
            opacity: [0.7, 0.2, 0.7],
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{ borderRadius: 16 }}
        />
        {/* Pli central */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-1 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? [0, 0.5, 0] : 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.12) 100%)',
            borderRadius: 2,
          }}
        />
        {/* Effet de lumière */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          initial={{ x: direction === 'left' ? '-80%' : '80%', opacity: 0 }}
          animate={{ x: '0%', opacity: [0, 0.25, 0] }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            background:
              'linear-gradient(120deg, rgba(255,255,255,0.7) 0%, transparent 80%)',
            borderRadius: 16,
          }}
        />
        {/* Speed lines effet manga */}
        {isActive && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-black/20"
                style={{
                  width: '2px',
                  height: '120%',
                  left: `${10 + i * 8}%`,
                  top: '-10%',
                  transform: `rotate(${-25 + i * 5}deg)`,
                }}
                animate={{
                  scaleY: [0.5, 1.5, 0.5],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 0.5,
                  repeat: 1,
                  delay: i * 0.02,
                }}
              />
            ))}
          </motion.div>
        )}
        {/* Flash blanc rapide */}
        {isActive && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-50 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.25 }}
            style={{ borderRadius: 16 }}
          />
        )}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectCard({ project, isDark, index, onHoverStart, onHoverEnd, currentIndex, total }: ProjectCardProps) {
  const url = project.url || "https://github.com/jordanGithu";
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`border-4 p-8 relative cursor-pointer transition-colors duration-300 block group ${isDark ? 'bg-gray-800 border-white' : 'bg-white border-black'}`}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      style={{ textDecoration: 'none', overflow: 'hidden' }}
    >
      {/* Texture papier manga (trame) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(135deg, #e5e5e5 0 2px, #fff 2px 8px)',
          opacity: 0.18,
          borderRadius: 12,
        }}
      />
      {/* Bulle manga annotation principale */}
      <motion.div
        className="absolute -top-8 left-1/2 -translate-x-1/2 px-4 py-2 border-2 border-black bg-white text-black font-black text-lg rounded-full shadow-lg z-30"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", pointerEvents: 'none' }}
      >
        {project.url ? 'VOIR LE PROJET' : 'VOIR MON GITHUB'}
      </motion.div>
      {/* Badge NEW! */}
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
          <h3 className={`text-2xl font-black mb-2 impact-title transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'}`}>{project.title}</h3>
          <div className={`inline-block px-3 py-1 border-2 text-sm font-black transition-colors duration-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-black text-black'}`}>{project.type}</div>
        </div>
        <ExternalLink className={`h-6 w-6 transition-colors duration-300 ${isDark ? 'text-white' : 'text-black'}`} />
      </div>
      <p className={`mb-6 leading-relaxed font-medium transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-black'}`}>{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech, i) => (
          <span key={i} className={`px-3 py-1 border-2 rounded font-black text-xs transition-colors duration-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-black text-black'}`}>{tech}</span>
        ))}
      </div>
      {/* Annotation Page X/Y */}
      {typeof currentIndex === 'number' && typeof total === 'number' && (
        <div
          className="absolute bottom-2 right-4 px-3 py-1 border-2 border-black bg-white text-black font-black text-xs rounded-full shadow z-30"
          style={{ fontFamily: "'Impact', 'Arial Black', sans-serif", pointerEvents: 'none', boxShadow: '0 2px 8px #0002' }}
        >
          {`Page ${currentIndex + 1} / ${total}`}
        </div>
      )}
    </motion.a>
  );
} 