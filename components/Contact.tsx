"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useInView } from "@/hooks/useInView";

type SocialLink = {
  label: string;
  href?: string;
  value?: string;
  icon: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/mabdullah-ismail", icon: "⬡" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-abdullah-ismail/", icon: "◈" },
  { label: "Instagram", href: "https://instagram.com/abdxllaxh", icon: "◇" },
];

export default function Contact() {
  const { ref, isInView } = useInView();
  const { displayText: headingText } = useTextScramble("CONTACT.LINK", {
    speed: 25, trigger: isInView,
  });
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> Connection established.",
    "> Awaiting input...",
  ]);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    setTerminalLines((prev) => [
      ...prev,
      `> USER: ${terminalInput}`,
      "> M_ABDULLAH_SYS: Establishing secure connection...",
    ]);
    const message = terminalInput;
    setTerminalInput("");
    setIsSending(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/abdullahismail249@yahoo.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ message: message })
      });

      if (response.ok) {
        setTerminalLines((prev) => [
          ...prev,
          "> M_ABDULLAH_SYS: Message transmitted successfully.",
          "> Awaiting next input...",
        ]);
      } else {
        throw new Error("Transmission failed");
      }
    } catch (err) {
      setTerminalLines((prev) => [
        ...prev,
        "> ERROR: Network anomaly detected. Transmission failed.",
        "> Awaiting next input...",
      ]);
    }
    
    setIsSending(false);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-4xl mx-auto px-6 md:px-8 relative" style={{ zIndex: "var(--z-ui)" }}>
        <div className="section-heading">
          <h2 className="font-display text-xl md:text-2xl tracking-[0.2em]" style={{ color: "var(--neon-cyan)" }}>
            {headingText}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="cyber-panel corner-accents overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2" style={{ background: "rgba(0,240,255,0.03)", borderBottom: "1px solid var(--border-dim)" }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--neon-red)" }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--neon-amber)" }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--neon-green)" }} />
                </div>
                <span className="text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>TERMINAL v2.1</span>
              </div>

              {/* Terminal output */}
              <div className="p-4 h-48 overflow-y-auto font-mono text-xs space-y-1" style={{ background: "rgba(3,7,18,0.5)" }}>
                {terminalLines.map((line, i) => (
                  <div key={i} style={{ color: line.includes("USER:") ? "var(--neon-amber)" : "var(--neon-green)" }}>{line}</div>
                ))}
                {isSending && <div style={{ color: "var(--neon-cyan)" }}>{">"} Transmitting...</div>}
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex items-center px-4 py-3" style={{ borderTop: "1px solid var(--border-dim)" }}>
                <span className="text-xs mr-2" style={{ color: "var(--neon-cyan)" }}>{">"}</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent outline-none text-[16px] md:text-xs tracking-wider"
                  style={{ color: "var(--text-primary)", caretColor: "var(--neon-cyan)" }}
                />
                <button type="submit" className="text-[0.6rem] tracking-[0.2em] uppercase ml-3 transition-colors duration-300 hover:text-white" style={{ color: "var(--neon-cyan)" }}>
                  SEND
                </button>
              </form>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="text-[0.65rem] tracking-[0.3em] uppercase mb-6" style={{ color: "var(--neon-cyan)" }}>
              {">"} DATA_LINKS.EXTERNAL
            </div>

            {SOCIAL_LINKS.map((link, i) => {
              const content = (
                <>
                  <div className="flex items-center gap-3">
                    <span className="text-lg" style={{ color: "var(--text-muted)" }}>{link.icon}</span>
                    <span className="text-sm tracking-[0.1em]" style={{ color: "var(--text-primary)" }}>
                      {link.value || link.label}
                    </span>
                  </div>
                  {link.href && (
                    <span className="text-[0.6rem] tracking-wider opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300" style={{ color: "var(--neon-cyan)" }}>
                      CONNECT →
                    </span>
                  )}
                </>
              );

              const wrapperClass = "cyber-panel p-4 flex items-center justify-between group block w-full text-left";

              if (link.href) {
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className={wrapperClass}
                    data-magnetic
                  >
                    {content}
                  </motion.a>
                );
              }

              return (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className={wrapperClass}
                >
                  {content}
                </motion.div>
              );
            })}

            {/* Status */}
            <div className="cyber-panel p-4 mt-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="pulse-dot" />
                <span className="text-[0.65rem] tracking-[0.2em] uppercase" style={{ color: "var(--neon-green)" }}>Available for Work</span>
              </div>
              <p className="text-[0.6rem] tracking-wider" style={{ color: "var(--text-muted)" }}>Response time: &lt; 24 hours</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
