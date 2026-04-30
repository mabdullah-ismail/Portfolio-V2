"use client";

import { useState, useEffect } from "react";

const BOOT_LINES = [
  { text: "> M.ABDULLAH_SYS v2.1 BIOS", delay: 0 },
  { text: "> Initializing kernel modules...", delay: 200 },
  { text: "> Loading memory: 32GB DDR5 [OK]", delay: 400 },
  { text: "> GPU detected: RTX_NEURAL_4090 [OK]", delay: 600 },
  { text: "> Mounting /dev/portfolio...", delay: 800 },
  { text: "> Establishing neural link...", delay: 1000 },
  { text: "> Loading 3D render pipeline...", delay: 1200 },
  { text: "> Compiling shader programs...", delay: 1400 },
  { text: "> Connecting to data nodes...", delay: 1600 },
  { text: "> System integrity: ████████████ 100%", delay: 1800 },
  { text: "> ALL SYSTEMS NOMINAL", delay: 2100 },
  { text: "", delay: 2400 },
  { text: "> WELCOME, OPERATOR.", delay: 2600 },
];

export default function BootScreen({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show boot lines progressively
    BOOT_LINES.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
        setProgress(Math.min(100, ((index + 1) / BOOT_LINES.length) * 100));
      }, line.delay);
    });

    // Fade out after all lines shown
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3200);

    // Complete after fade
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`boot-screen ${fadeOut ? "fade-out" : ""}`}
      id="boot-screen"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Glow center */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background:
            "radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Logo */}
      <div className="relative mb-8 text-center">
        <h1
          className="font-display text-3xl md:text-4xl tracking-[0.3em] text-glow-cyan"
          style={{ color: "var(--neon-cyan)" }}
        >
          M. ABDULLAH
        </h1>
        <p
          className="mt-2 text-xs tracking-[0.5em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          v2.1 // SYSTEM BOOT SEQUENCE
        </p>
      </div>

      {/* Boot log */}
      <div className="relative w-[90%] max-w-md space-y-1 mb-6 font-mono text-left">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="boot-line"
            style={{
              animationDelay: `${i * 50}ms`,
              color:
                i === BOOT_LINES.length - 1
                  ? "var(--neon-cyan)"
                  : "var(--neon-green)",
            }}
          >
            {line.text}
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="boot-progress">
        <div
          className="boot-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p
        className="mt-4 text-xs tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        {progress < 100
          ? `LOADING MODULES... ${Math.round(progress)}%`
          : "SYSTEM READY"}
      </p>
    </div>
  );
}
