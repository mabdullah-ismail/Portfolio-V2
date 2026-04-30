"use client";

import { motion } from "framer-motion";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useInView } from "@/hooks/useInView";

const ACHIEVEMENTS = [
  {
    title: "Cyber Security Intern @ Arch Tech",
    date: "MAR 2026 — PRESENT",
    description: "Remote internship focusing on network security, vulnerability assessments, and Python-based automation scripts.",
    tags: ["Cybersecurity", "Python", "Kali Linux"],
    icon: "",
    color: "var(--neon-green)",
  },
  {
    title: "Lead Media & Coverage @ GDGoC BNU",
    date: "APR 2026 — PRESENT",
    description: "Leading the media team for Google Developer Groups on Campus. Managing video production and social media marketing.",
    tags: ["Media", "Video Editing", "Leadership"],
    icon: "",
    color: "var(--neon-amber)",
  },
  {
    title: "Game Developer Intern @ OZI Publishing",
    date: "JUL 2025 — SEP 2025",
    description: "Developed 3D simulations and Hyper-Casual Android games. Focused extensively on level design and core game logic.",
    tags: ["Unity", "C#", "Level Design"],
    icon: "",
    color: "var(--neon-magenta)",
  },
  {
    title: "Head of Logistics & Event Management",
    date: "2024 — PRESENT",
    description: "Directorate General at BTECH Fest, Head of Logistics for SCITECH Society, and Co-Head of Events at Confiniti BNU.",
    tags: ["Management", "Logistics", "Community"],
    icon: "",
    color: "var(--neon-cyan)",
  },
];

export default function Achievements() {
  const { ref, isInView } = useInView();
  const { displayText: headingText } = useTextScramble("ACHIEVEMENTS.LOG", {
    speed: 25, trigger: isInView,
  });

  return (
    <section id="achievements" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative" style={{ zIndex: "var(--z-ui)" }}>
        <div className="section-heading">
          <h2 className="font-display text-xl md:text-2xl tracking-[0.2em]" style={{ color: "var(--neon-cyan)" }}>
            {headingText}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px]" style={{ background: "linear-gradient(180deg, var(--border-glow), var(--border-dim), transparent)" }} />

          <div className="space-y-12">
            {ACHIEVEMENTS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full z-10" style={{ background: item.color, boxShadow: `0 0 10px ${item.color}` }} />

                {/* Content card */}
                <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="cyber-panel p-5">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[0.55rem] tracking-[0.2em] font-display" style={{ color: item.color }}>{item.date}</span>
                    </div>
                    <h3 className="font-display text-sm tracking-[0.1em] mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (<span key={tag} className="cyber-tag">{tag}</span>))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
