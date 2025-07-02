import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MangaMascotProps {
  image: string;
  comment: string;
  description?: string;
}

const MangaMascot: React.FC<MangaMascotProps> = ({ image, comment, description }) => {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "flex-end",
        gap: 12,
        cursor: "pointer",
        pointerEvents: "auto",
      }}
      title="Clique sur moi pour plus de détails !"
      onClick={() => setShowDesc((v) => !v)}
    >
      <img
        src={image}
        alt="Mascotte Deadpool"
        style={{ width: 90, height: 90, objectFit: "contain", filter: "drop-shadow(2px 4px 0 #0006)" }}
      />
      <div
        style={{
          position: "relative",
          background: showDesc ? "#ffe082" : "#fff",
          border: "3px solid #111",
          borderRadius: 18,
          padding: "16px 22px 16px 18px",
          fontFamily: "'Impact', 'Arial Black', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          color: "#111",
          boxShadow: "2px 4px 12px #0002",
          minWidth: 120,
          maxWidth: 260,
          transition: "background 0.3s",
        }}
      >
        {showDesc ? (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              style={{ fontSize: 16 }}
            >
              {description || "Descriptif détaillé du projet à personnaliser."}
            </motion.div>
          </AnimatePresence>
        ) : (
          <span>
            {comment} <span style={{ color: '#e3342f', fontWeight: 900, fontSize: 22 }}>⬆</span>
          </span>
        )}
        {/* Queue de la bulle */}
        <div
          style={{
            position: "absolute",
            left: -18,
            bottom: 12,
            width: 24,
            height: 24,
            background: "transparent",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M24 0 Q8 24 0 24" fill={showDesc ? "#ffe082" : "#fff"} stroke="#111" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default MangaMascot; 