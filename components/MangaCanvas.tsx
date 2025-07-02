"use client"

import React, { useRef, useEffect, useState } from "react";

const COLORS = [
  { name: "Noir", value: "#111" },
  { name: "Blanc", value: "#fff" },
  { name: "Rouge", value: "#e3342f" },
  { name: "Vert", value: "#22c55e" },
  { name: "Bleu", value: "#2563eb" },
];

const LucideBrushSVG = ({ size = 32, color = "#111" }: { size?: number; color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
    <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
  </svg>
);

// SVG d'ancre calligraphique japonaise, très épais, effilé, avec bavures
const CalligraphyAnchor = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size * 2} viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Corps principal, très épais à la base, effilé en haut */}
    <path
      d="M20 75 Q10 60 18 40 Q30 10 20 5 Q28 18 25 40 Q22 60 35 75 Z"
      fill="#111"
      fillOpacity="0.98"
      stroke="#111"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    {/* Bavures/éclaboussures à gauche */}
    <ellipse cx="10" cy="60" rx="4" ry="1.5" fill="#111" fillOpacity="0.7" />
    <ellipse cx="12" cy="50" rx="2.2" ry="0.8" fill="#111" fillOpacity="0.5" />
    <ellipse cx="8" cy="70" rx="2.5" ry="1.1" fill="#111" fillOpacity="0.4" />
    {/* Bavures/éclaboussures à droite */}
    <ellipse cx="32" cy="65" rx="3.5" ry="1.2" fill="#111" fillOpacity="0.6" />
    <ellipse cx="30" cy="55" rx="2" ry="0.7" fill="#111" fillOpacity="0.4" />
    {/* Pointe effilée */}
    <ellipse cx="20" cy="8" rx="1.2" ry="3.5" fill="#111" fillOpacity="0.7" />
    {/* Base très marquée */}
    <ellipse cx="25" cy="77" rx="7" ry="3.5" fill="#111" fillOpacity="0.85" />
  </svg>
);

const MangaCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [paths, setPaths] = useState<{ points: [number, number][], color: string }[]>([]);
  const [currentPath, setCurrentPath] = useState<[number, number][]>([]);
  const [clearKey, setClearKey] = useState(0);
  const [color, setColor] = useState<string>(COLORS[0].value);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mouse, setMouse] = useState<{ x: number, y: number } | null>(null);

  // Dessin sur le canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // Redessine tous les traits
    for (const path of paths) {
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.strokeStyle = path.color;
      ctx.shadowColor = path.color;
      ctx.shadowBlur = 6;
      // Effet pinceau : variation d'épaisseur
      ctx.beginPath();
      path.points.forEach(([x, y], i, arr) => {
        ctx.lineWidth = 10 + Math.sin(i * 0.7) * 4 + Math.random() * 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();
    }
    // Trace le trait en cours
    if (currentPath.length > 0) {
      ctx.save();
      ctx.globalAlpha = 0.85;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      currentPath.forEach(([x, y], i) => {
        ctx.lineWidth = 10 + Math.sin(i * 0.7) * 4 + Math.random() * 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.restore();
    }
  }, [paths, currentPath, clearKey, color]);

  // Gestion du dessin
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!paletteOpen) return;
    if (e.button !== 0) return;
    setDrawing(true);
    const dpr = window.devicePixelRatio || 1;
    const x = e.clientX * dpr;
    const y = e.clientY * dpr;
    setCurrentPath([[x, y]]);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (paletteOpen) setMouse({ x: e.clientX, y: e.clientY });
    if (!drawing || !paletteOpen) return;
    const dpr = window.devicePixelRatio || 1;
    const x = e.clientX * dpr;
    const y = e.clientY * dpr;
    setCurrentPath((prev) => [...prev, [x, y]]);
  };
  const handlePointerUp = () => {
    setDrawing(false);
    if (currentPath.length > 1 && paletteOpen) {
      setPaths((prev) => [...prev, { points: currentPath, color }]);
    }
    setCurrentPath([]);
  };

  // Effacer tout
  const handleClear = () => {
    setPaths([]);
    setCurrentPath([]);
    setClearKey((k) => k + 1);
  };

  // Resize canvas responsive
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      {/* Canvas de dessin */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: paletteOpen ? 1000 : 0,
          pointerEvents: paletteOpen ? "auto" : "none",
          background: "transparent",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
      {/* Curseur pinceau custom SVG */}
      {paletteOpen && mouse && (
        <div
          style={{
            position: "fixed",
            left: mouse.x - 16,
            top: mouse.y - 16,
            pointerEvents: "none",
            zIndex: 10001,
            width: 32,
            height: 32,
            filter: "drop-shadow(1px 2px 0 #0008)",
            opacity: 0.95,
          }}
        >
          <LucideBrushSVG size={32} />
        </div>
      )}
      {/* Bouton pinceau flottant */}
      <button
        onClick={() => setPaletteOpen((open) => !open)}
        style={{
          position: "fixed",
          bottom: 130,
          right: 24,
          zIndex: 10003,
          background: paletteOpen ? "#fde68a" : "#fff",
          border: paletteOpen ? "3px solid #eab308" : "2px solid #111",
          borderRadius: "50%",
          width: 48,
          height: 48,
          boxShadow: "0 2px 8px #0002",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "background 0.2s, border 0.2s",
        }}
        aria-label="Ouvrir la palette de couleurs"
      >
        <LucideBrushSVG size={28} color={color} />
      </button>
      {/* Palette de couleurs déroulante */}
      {paletteOpen && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            right: 24,
            zIndex: 10002,
            display: "flex",
            gap: 10,
            background: "#fff",
            borderRadius: 12,
            padding: "8px 12px",
            boxShadow: "0 2px 8px #0002",
            border: "2px solid #111",
            animation: "fadeInPalette 0.3s",
          }}
        >
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => setColor(c.value)}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: color === c.value ? "3px solid #eab308" : "2px solid #111",
                background: c.value,
                margin: 0,
                outline: color === c.value ? "2px solid #eab308" : "none",
                boxShadow: color === c.value ? "0 0 0 3px #fde68a" : "none",
                cursor: "pointer",
                transition: "box-shadow 0.2s, border 0.2s",
              }}
              aria-label={c.name}
            />
          ))}
        </div>
      )}
      {/* Bouton effacer tout */}
      <button
        onClick={handleClear}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 10002,
          background: "#fff",
          color: "#111",
          border: "2px solid #111",
          borderRadius: 8,
          padding: "8px 18px",
          fontWeight: 900,
          fontFamily: "'Impact', 'Arial Black', sans-serif",
          fontSize: 18,
          boxShadow: "0 2px 8px #0002",
          cursor: "pointer",
          opacity: 0.85,
        }}
      >
        Effacer tout
      </button>
      {/* Animation palette */}
      <style>{`
        @keyframes fadeInPalette {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default MangaCanvas; 