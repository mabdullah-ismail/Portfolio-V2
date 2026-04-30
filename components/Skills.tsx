"use client";

import { motion } from "framer-motion";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useInView } from "@/hooks/useInView";

const SKILL_CATEGORIES = [
  {
    title: "GAME DEV & DESIGN",
    color: "var(--neon-cyan)",
    skills: [
      { name: "Unity 3D / 2D", level: 90 },
      { name: "C# Scripting", level: 85 },
      { name: "Level Design", level: 88 },
      { name: "PixelArt (Aseprite)", level: 82 },
      { name: "Figma UI/UX", level: 75 },
    ],
  },
  {
    title: "CORE PROGRAMMING",
    color: "var(--neon-green)",
    skills: [
      { name: "Python", level: 85 },
      { name: "C++", level: 80 },
      { name: "HTML / CSS / JS", level: 88 },
      { name: "React / Flutter", level: 70 },
      { name: "System Design", level: 75 },
    ],
  },
  {
    title: "SECURITY & SYSTEMS",
    color: "var(--neon-magenta)",
    skills: [
      { name: "Kali Linux", level: 80 },
      { name: "Network Security", level: 75 },
      { name: "Vulnerability Testing", level: 70 },
      { name: "Git / GitHub", level: 85 },
      { name: "Linux CLI", level: 78 },
    ],
  },
  {
    title: "MANAGEMENT & MEDIA",
    color: "var(--neon-amber)",
    skills: [
      { name: "Video Post-Production", level: 92 },
      { name: "Event Management", level: 88 },
      { name: "Logistics Coordination", level: 85 },
      { name: "Team Leadership", level: 80 },
      { name: "Social Media Marketing", level: 75 },
    ],
  },
];

export default function Skills() {
  const { ref, isInView } = useInView();
  const { displayText: headingText } = useTextScramble("SKILLS.MAP", {
    speed: 25, trigger: isInView,
  });

  return (
    <section id="skills" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative" style={{ zIndex: "var(--z-ui)" }}>
        <div className="section-heading">
          <h2 className="font-display text-xl md:text-2xl tracking-[0.2em]" style={{ color: "var(--neon-cyan)" }}>
            {headingText}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: ci * 0.15 }}
              className="cyber-panel p-6"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: "1px solid var(--border-dim)" }}>
                <div className="w-2 h-2" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                <span className="font-display text-xs tracking-[0.2em]" style={{ color: cat.color }}>{cat.title}</span>
              </div>

              {/* Skills list */}
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[0.7rem] tracking-wider" style={{ color: "var(--text-secondary)" }}>{skill.name}</span>
                      <span className="text-[0.6rem] font-display tracking-wider" style={{ color: cat.color }}>{skill.level}%</span>
                    </div>
                    <div className="h-[3px] w-full" style={{ background: "var(--bg-tertiary)" }}>
                      <motion.div
                        className="h-full relative overflow-hidden"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: ci * 0.15 + si * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          background: `linear-gradient(90deg, ${cat.color}, transparent)`,
                          boxShadow: `0 0 6px ${cat.color}`,
                        }}
                      >
                        {/* Scanning pulse */}
                        <motion.div
                          className="absolute inset-0 w-1/4 h-full"
                          style={{
                            background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                          }}
                          animate={{ x: ["-100%", "400%"] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
                        />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
