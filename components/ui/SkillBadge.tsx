import { motion } from 'framer-motion';
import React from 'react';

interface SkillBadgeProps {
  name: string;
  color: string;
  index: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export default function SkillBadge({ name, color, index, onHoverStart, onHoverEnd }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="px-6 py-3 border-2 border-black font-black text-white cursor-pointer relative"
      style={{ background: color, clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)' }}
      whileHover={{ scale: 1.2, rotate: 0, zIndex: 10 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {name}
      <motion.div
        className="absolute inset-0 bg-white opacity-0 pointer-events-none"
        whileHover={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
} 