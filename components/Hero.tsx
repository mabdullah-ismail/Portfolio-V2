"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTextScramble } from "@/hooks/useTextScramble";

export default function Hero({ isReady }: { isReady: boolean }) {
  const [showContent, setShowContent] = useState(false);
  const { displayText: titleText } = useTextScramble("M. ABDULLAH", {
    speed: 40,
    delay: 300,
    trigger: showContent,
  });
  const { displayText: subtitleText } = useTextScramble(
    "AI AUTOMATION // GAME DEV // CYBER SECURITY",
    { speed: 20, delay: 800, trigger: showContent }
  );

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setShowContent(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  if (!showContent) return <section id="hero" className="min-h-[100svh]" />;

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Radial glow */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,240,255,0.06) 0%, transparent 60%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Diagonal accent line */}
      <div
        className="absolute hidden md:block"
        style={{
          width: "1px",
          height: "120vh",
          background:
            "linear-gradient(180deg, transparent, var(--neon-cyan), transparent)",
          opacity: 0.1,
          top: "-10vh",
          right: "25%",
          transform: "rotate(15deg)",
        }}
      />

      {/* Main content */}
      <div className="relative text-center px-6 max-w-4xl mx-auto" style={{ zIndex: "var(--z-ui)" }}>
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2"
          style={{
            border: "1px solid var(--border-dim)",
            background: "rgba(0, 240, 255, 0.03)",
          }}
        >
          <div className="pulse-dot" />
          <span
            className="text-[0.65rem] tracking-[0.2em] uppercase"
            style={{ color: "var(--neon-green)" }}
          >
            System Online // All Nodes Active
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.15em] mb-6 glitch-text"
          style={{ color: "var(--neon-cyan)" }}
          data-text={titleText}
        >
          {titleText}
        </motion.h1>

        {/* Version tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-6"
        >
          <span
            className="text-xs tracking-[0.4em] font-display"
            style={{ color: "var(--text-muted)" }}
          >
            [ v2.1 // CLASSIFIED ]
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm md:text-base tracking-[0.15em] mb-12"
          style={{ color: "var(--text-secondary)" }}
        >
          {subtitleText}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            className="neon-btn"
            onClick={() => {
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo("#projects", { offset: -50 });
              } else {
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            ► Initialize Projects
          </button>
          <button
            className="neon-btn"
            style={{
              borderColor: "var(--neon-magenta)",
              color: "var(--neon-magenta)",
            }}
            onClick={() => {
              if ((window as any).lenis) {
                (window as any).lenis.scrollTo("#contact", { offset: -50 });
              } else {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            ◆ Establish Contact
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-[0.55rem] tracking-[0.3em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Scroll to Navigate
          </span>
          <div
            className="w-[1px] h-8"
            style={{
              background:
                "linear-gradient(180deg, var(--neon-cyan), transparent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div
        className="absolute top-24 left-6 text-[0.55rem] tracking-wider hidden md:block"
        style={{ color: "var(--text-muted)" }}
      >
        LAT: 24.8607°
        <br />
        LNG: 67.0011°
      </div>
      <div
        className="absolute top-24 right-6 text-[0.55rem] tracking-wider text-right hidden md:block"
        style={{ color: "var(--text-muted)" }}
      >
        NODE: PRIMARY
        <br />
        PING: 12ms
      </div>
    </section>
  );
}
