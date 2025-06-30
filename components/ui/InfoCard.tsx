import { motion } from 'framer-motion';
import React from 'react';

interface InfoCardProps {
  title: string;
  color: string;
  children: React.ReactNode;
  badgeText: string;
  badgeColor: string;
  badgePosition?: 'left' | 'right';
  animationDelay?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  className?: string;
}

export default function InfoCard({
  title,
  color,
  children,
  badgeText,
  badgeColor,
  badgePosition = 'left',
  animationDelay = 0,
  onHoverStart,
  onHoverEnd,
  className = '',
}: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: animationDelay }}
      viewport={{ once: true }}
      className={`border-4 p-6 relative cursor-pointer transition-colors duration-300 ${className}`}
      whileHover={{ scale: 1.02 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      style={{ background: color }}
    >
      <h4 className="text-2xl font-black mb-4 impact-title transition-colors duration-300">
        {title}
      </h4>
      {children}
    </motion.div>
  );
} 