"use client";

import { useState, useEffect } from "react";

const SYSTEM_MESSAGES = [
  "SYS.KERNEL: All modules loaded",
  "NET.STATUS: Connected to neural mesh",
  "GPU.RENDER: Pipeline active @ 60fps",
  "MEM.ALLOC: 128MB allocated for UI",
  "SEC.SCAN: No threats detected",
  "DATA.SYNC: Portfolio cache updated",
  "NODE.PING: All endpoints responding",
  "AUTH.PASS: Operator identified",
  "IO.READY: Neural link established",
  "UI.SYNC: Refreshing layout nodes",
  "ENV.BOOT: Environment stable",
  "HUD.INIT: Heads-up display online",
];

export default function TerminalLog() {
  const [logs, setLogs] = useState<{ text: string; time: string }[]>([]);
  const [currentSection, setCurrentSection] = useState("BOOT");

  useEffect(() => {
    // Add initial log
    const now = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs([{ text: "SYS.INIT: NEURAL_OS v2.1 operational", time: now }]);

    // Add periodic system messages
    const interval = setInterval(() => {
      const msg = SYSTEM_MESSAGES[Math.floor(Math.random() * SYSTEM_MESSAGES.length)];
      const time = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLogs((prev) => [...prev.slice(-2), { text: msg, time }]);
    }, 5000);

    // Track active section
    const handleScroll = () => {
      const sections = ["hero", "bio", "projects", "skills", "achievements", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 300) {
            const nextSection = sections[i].toUpperCase();
            if (nextSection !== currentSection) {
              setCurrentSection(nextSection);
              const time = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
              setLogs((prev) => [...prev.slice(-2), { text: `ACCESS.LOG: Switched to ${nextSection}`, time }]);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 px-4 py-2 flex items-center justify-between"
      style={{
        zIndex: 25,
        background: "rgba(3, 7, 18, 0.9)",
        backdropFilter: "blur(8px)",
        borderTop: "1px solid var(--border-dim)",
      }}
    >
      {/* Left: active section */}
      <div className="flex items-center gap-3">
        <div className="pulse-dot" />
        <span className="text-[0.55rem] tracking-[0.2em] uppercase font-display" style={{ color: "var(--neon-cyan)" }}>
          SEC:{currentSection}
        </span>
      </div>

      {/* Center: system log */}
      <div className="hidden md:flex items-center gap-2 overflow-hidden max-w-md">
        {logs.slice(-1).map((log, i) => (
          <span key={i} className="text-[0.5rem] tracking-wider truncate" style={{ color: "var(--text-muted)" }}>
            [{log.time}] {log.text}
          </span>
        ))}
      </div>

      {/* Right: status */}
      <div className="flex items-center gap-3">
        <span className="text-[0.5rem] tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
          FPS:60
        </span>
        <span className="text-[0.5rem] tracking-[0.2em]" style={{ color: "var(--neon-green)" }}>
          ● ONLINE
        </span>
      </div>
    </footer>
  );
}
