"use client";

import { motion } from "framer-motion";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useInView } from "@/hooks/useInView";

const BIO_DATA = {
  name: "M. ABDULLAH",
  role: "Game Dev // CyberSec",
  location: "Lahore, Pakistan",
  status: "ACTIVE",
  clearance: "LEVEL 5",
  bio: [
    "A passionate 4th-semester Computer Science student at Beaconhouse National University (BNU), specializing in building immersive digital experiences and applications.",
    "Focused on bridging creative design and robust engineering, with active explorations in Game Development (Unity), PixelArt (Aseprite), and Web/App Development.",
    "Currently expanding expertise in Cybersecurity (Kali Linux) and low-level system design with C++ and Python to tackle complex problem-solving scenarios.",
  ],
  stats: [
    { label: "Projects", value: "15+", icon: "◆" },
    { label: "Technologies", value: "12+", icon: "▲" },
    { label: "Events Led", value: "4+", icon: "●" },
    { label: "Years Active", value: "3+", icon: "■" },
  ],
};

export default function Bio() {
  const { ref, isInView } = useInView();
  const { displayText: headingText } = useTextScramble("IDENTITY.SYS", {
    speed: 25, trigger: isInView,
  });

  return (
    <section id="bio" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative" style={{ zIndex: "var(--z-ui)" }}>
        <div className="section-heading">
          <h2 className="font-display text-xl md:text-2xl tracking-[0.2em]" style={{ color: "var(--neon-cyan)" }}>
            {headingText}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Identity card */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="lg:col-span-2">
            <div className="cyber-panel corner-accents p-6">
              <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: "1px solid var(--border-dim)" }}>
                <span className="text-[0.6rem] tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>PERSONNEL FILE</span>
                <div className="flex items-center gap-2">
                  <div className="pulse-dot" />
                  <span className="text-[0.6rem] tracking-wider" style={{ color: "var(--neon-green)" }}>{BIO_DATA.status}</span>
                </div>
              </div>

              <div className="w-full aspect-square mb-6 flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary))", border: "1px solid var(--border-dim)" }}>
                <div className="text-center">
                  <div className="text-6xl mb-3 font-display" style={{ color: "var(--neon-cyan)", opacity: 0.3 }}>◈</div>
                  <span className="text-[0.55rem] tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>NEURAL AVATAR</span>
                </div>
              </div>

              {[
                { label: "CODENAME", value: BIO_DATA.name },
                { label: "ROLE", value: BIO_DATA.role },
                { label: "LOCATION", value: BIO_DATA.location },
                { label: "CLEARANCE", value: BIO_DATA.clearance },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid var(--border-dim)" }}>
                  <span className="text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>{item.label}</span>
                  <span className="text-[0.7rem] tracking-wider" style={{ color: "var(--text-primary)" }}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bio text + stats */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="space-y-4">
              <div className="text-[0.65rem] tracking-[0.3em] uppercase mb-4" style={{ color: "var(--neon-cyan)" }}>{"> SYSTEM.LOG // BIOGRAPHY"}</div>
              {BIO_DATA.bio.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{p}</p>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.4 }} className="grid grid-cols-2 gap-4">
              {BIO_DATA.stats.map((stat) => (
                <div key={stat.label} className="cyber-panel p-4 text-center">
                  <div className="text-lg mb-1 opacity-30" style={{ color: "var(--neon-cyan)" }}>{stat.icon}</div>
                  <div className="font-display text-2xl tracking-wider mb-1" style={{ color: "var(--neon-cyan)" }}>{stat.value}</div>
                  <div className="text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.6 }} className="cyber-panel cyber-panel-magenta p-4">
              <div className="text-[0.55rem] tracking-[0.3em] uppercase mb-2" style={{ color: "var(--neon-magenta)" }}>{">"} QUOTE.OUTPUT</div>
              <p className="text-sm italic leading-relaxed" style={{ color: "var(--text-secondary)" }}>&quot;The best way to predict the future is to build it.&quot;</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
