"use client";

import { useState, useEffect } from "react";

export default function GlitchOverlay() {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger a random glitch sometimes on scroll or section change
      if (Math.random() > 0.98) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isGlitching) return null;

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none overflow-hidden"
      style={{ mixBlendMode: "overlay" }}
    >
      <div className="absolute inset-0 bg-cyan-500 opacity-10 animate-pulse" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 10%, var(--neon-magenta) 10%, var(--neon-magenta) 11%)",
          transform: `translateY(${Math.random() * 100}%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "repeating-linear-gradient(90deg, transparent, transparent 20%, var(--neon-cyan) 20%, var(--neon-cyan) 21%)",
          transform: `translateX(${Math.random() * 100}%)`,
        }}
      />
    </div>
  );
}
