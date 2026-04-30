"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useInView } from "@/hooks/useInView";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

const FALLBACK_PROJECTS = [
  { id: 1, name: "EcoScan", description: "AI-powered sustainable construction material identifier with carbon footprint analysis and eco-friendly alternatives.", html_url: "#", language: "TypeScript", stargazers_count: 12, forks_count: 3, topics: ["react", "ai", "sustainability"], updated_at: "2026-04-28T00:00:00Z" },
  { id: 2, name: "NEURAL_OS Portfolio", description: "Immersive cyberpunk 3D portfolio terminal with Spline Earth model and GSAP scrollytelling.", html_url: "#", language: "TypeScript", stargazers_count: 8, forks_count: 1, topics: ["next.js", "3d", "portfolio"], updated_at: "2026-04-30T00:00:00Z" },
  { id: 3, name: "DevOps Pipeline", description: "Automated CI/CD pipeline with Docker containerization, GitHub Actions, and cloud deployment.", html_url: "#", language: "Python", stargazers_count: 5, forks_count: 2, topics: ["devops", "docker", "ci-cd"], updated_at: "2026-04-26T00:00:00Z" },
  { id: 4, name: "DataVault API", description: "RESTful API with JWT auth, rate limiting, and real-time WebSocket data streaming.", html_url: "#", language: "JavaScript", stargazers_count: 15, forks_count: 4, topics: ["api", "node.js", "websocket"], updated_at: "2026-04-20T00:00:00Z" },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "var(--neon-cyan)",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Rust: "#dea584",
  Go: "#00ADD8",
};

export default function Projects() {
  const { ref, isInView } = useInView();
  const { displayText: headingText } = useTextScramble("PROJECTS.DB", { speed: 25, trigger: isInView });
  const [repos, setRepos] = useState<Repo[]>(FALLBACK_PROJECTS);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    // Attempt to fetch real repos - gracefully fall back
    fetch("https://api.github.com/users/mabdullah-ismail/repos?sort=updated&per_page=6")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setRepos(data.slice(0, 6)); })
      .catch(() => {});
  }, []);

  return (
    <section id="projects" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-8 relative" style={{ zIndex: "var(--z-ui)" }}>
        <div className="section-heading">
          <h2 className="font-display text-xl md:text-2xl tracking-[0.2em]" style={{ color: "var(--neon-cyan)" }}>{headingText}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="cyber-panel corner-accents p-6 block group transition-all duration-500"
              onMouseEnter={() => setHoveredId(repo.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-magnetic
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg" style={{ color: hoveredId === repo.id ? "var(--neon-cyan)" : "var(--text-muted)" }}>◇</span>
                  <h3 className="font-display text-sm tracking-[0.15em] transition-colors duration-300" style={{ color: hoveredId === repo.id ? "var(--neon-cyan)" : "var(--text-primary)" }}>{repo.name}</h3>
                </div>
                <span className="text-[0.55rem] tracking-wider" style={{ color: "var(--text-muted)" }}>
                  {new Date(repo.updated_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                {repo.description || "No description available."}
              </p>

              {/* Topics */}
              <div className="flex flex-wrap gap-2 mb-4">
                {(repo.topics || []).slice(0, 4).map((topic) => (
                  <span key={topic} className="cyber-tag">{topic}</span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--border-dim)" }}>
                <div className="flex items-center gap-4">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[repo.language] || "var(--text-muted)" }} />
                      <span className="text-[0.6rem] tracking-wider" style={{ color: "var(--text-secondary)" }}>{repo.language}</span>
                    </div>
                  )}
                  <span className="text-[0.6rem]" style={{ color: "var(--text-muted)" }}>★ {repo.stargazers_count}</span>
                  <span className="text-[0.6rem]" style={{ color: "var(--text-muted)" }}>⑂ {repo.forks_count}</span>
                </div>
                <span className="text-[0.6rem] tracking-wider opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--neon-cyan)" }}>VIEW →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
