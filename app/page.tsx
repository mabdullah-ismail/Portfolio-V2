"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplineScene from "@/components/SplineScene";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "EcoScan",
    role: "Co-Founder / Startup",
    description: "Secured 4th Position at Shelby Stack. A sustainable tech solution focused on environmental impact and vision for green innovation.",
    tags: ["Sustainable Tech", "AI", "Startup"],
    link: "https://ecoscan-pk.web.app"
  },
  {
    title: "Raise The Voice",
    role: "Unified Data Platform",
    description: "A community engagement initiative connecting Pakistan's law enforcement and judiciary for transparency and justice.",
    tags: ["Data Platform", "Social Impact", "DBMS"],
    link: "https://www.linkedin.com/in/muhammad-abdullah-ismail/details/projects/"
  },
  {
    title: "Arch Tech",
    role: "Cybersecurity / Intern",
    description: "Focusing on network security, vulnerability assessments, and Python-based automation scripts for digital defense.",
    tags: ["Python", "Kali Linux", "Security"],
    link: "https://www.linkedin.com/in/muhammad-abdullah-ismail/"
  },
  {
    title: "GDGoC BNU",
    role: "Leadership / Google Dev",
    description: "Lead of Media & Coverage. Managing video production and social marketing for the Google Developer Groups community.",
    tags: ["Media", "Leadership", "Community"],
    link: "https://www.linkedin.com/in/muhammad-abdullah-ismail/"
  },
  {
    title: "OZI Publishing",
    role: "Game Dev / Intern",
    description: "Developed 3D simulations and Hyper-Casual Android games. Specialized in level design and Unity core logic.",
    tags: ["Unity", "C#", "Game Dev"],
    link: "https://www.linkedin.com/in/muhammad-abdullah-ismail/"
  },
  {
    title: "SCIT Management",
    role: "Software Engineering",
    description: "A C++ & MySQL based University Management System streamlining academic operations through role-based access.",
    tags: ["C++", "MySQL", "OOP"],
    link: "https://github.com/mabdullah-ismail"
  },
  {
    title: "ArcadeHub",
    role: "C++ Game Console",
    description: "Multi-game console featuring GeoGuesser, Problem Solver, and Hangman with dynamic leaderboards and file handling.",
    tags: ["C++", "Game Logic", "STL"],
    link: "https://github.com/mabdullah-ismail/Arcade-Hub"
  }
];

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  
  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    // Hero Fade Out Animation
    gsap.to(".hero-content", {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0,
      y: -100,
    });

    // Horizontal Scroll for Portfolio (Experience)
    const container = document.querySelector(".horizontal-scroll-container") as HTMLElement;
    
    if (container) {
      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          pin: true,
          scrub: 1,
          end: () => "+=" + container.scrollWidth,
          invalidateOnRefresh: true,
        }
      });
    }

    // Reveal animations for text
    gsap.utils.toArray(".reveal-text").forEach((text: any) => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
      });
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="relative bg-[#E5E5E5] text-[#0A0A0A] overflow-hidden font-sans">
      {/* Fixed 3D Spline Background */}
      <div className="spline-container">
        <SplineScene />
      </div>

      {/* DOM Overlay Content */}
      <div className="relative z-10 pointer-events-none">
        
        {/* Navigation / Header */}
        <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
          <div className="font-display font-bold text-xl tracking-tight uppercase">GENO</div>
          <div className="hidden md:flex gap-8 font-display text-sm uppercase tracking-widest">
            <span className="cursor-pointer hover:opacity-50 transition-opacity pointer-events-auto" onClick={() => (window as any).lenis?.scrollTo('#about')}>About</span>
            <span className="cursor-pointer hover:opacity-50 transition-opacity pointer-events-auto" onClick={() => (window as any).lenis?.scrollTo('#experience')}>Work</span>
            <span className="cursor-pointer hover:opacity-50 transition-opacity pointer-events-auto" onClick={() => (window as any).lenis?.scrollTo('#contact')}>Contact</span>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="h-[100vh] flex flex-col items-center justify-center pointer-events-auto relative">
          <div className="hero-content text-center mix-blend-difference text-white pointer-events-none">
            <h1 className="heading-massive">
              ABDULLAH
            </h1>
            <p className="mt-4 font-display text-sm md:text-base tracking-[0.4em] uppercase opacity-80">
              Redefining Digital Boundaries Through AI & Security
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-[100vh] flex items-center section-padding pointer-events-auto">
          <div className="max-w-3xl glass-card p-12 md:p-16 reveal-text">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 text-[#0A0A0A]">Profile.</h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[#484848] font-light">
              I am M. Abdullah, a multi-disciplinary developer and lead based in Lahore. 
              Currently exploring the intersection of <strong className="font-bold text-[#0A0A0A]">Cybersecurity</strong>, <strong className="font-bold text-[#0A0A0A]">Game Development</strong>, and <strong className="font-bold text-[#0A0A0A]">AI Automation</strong>. 
              My work focuses on building robust digital systems with robotic precision and minimalist aesthetics.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <button className="btn-primary" onClick={() => (window as any).lenis?.scrollTo('#experience')}>
                View Projects
              </button>
              <a href="https://linkedin.com/in/muhammad-abdullah-ismail/" target="_blank" rel="noreferrer" className="btn-outlined">
                LinkedIn
              </a>
              <a href="https://github.com/mabdullah-ismail" target="_blank" rel="noreferrer" className="btn-outlined">
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Projects Horizontal Scroll Section */}
        <section id="experience" className="h-[100vh] pointer-events-auto overflow-hidden">
          <div className="horizontal-scroll-container flex gap-12 px-[10vw] items-center h-full w-max">
            {PROJECTS.map((project, index) => (
              <a 
                key={index}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="horizontal-panel flex-shrink-0 w-[85vw] md:w-[45vw] group"
              >
                <div className="glass-card p-10 md:p-12 rounded-none h-full border border-transparent group-hover:border-[#0A0A0A] transition-all duration-500 hover:bg-white/90">
                  <div className="flex justify-between items-start mb-4">
                    <div className="font-display text-sm text-[#484848] uppercase tracking-widest">{project.role}</div>
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#0A0A0A] group-hover:tracking-tight transition-all">{project.title}</h3>
                  <p className="text-lg text-[#484848] mb-8 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 border border-[#ccc] text-[10px] uppercase tracking-[0.2em] text-[#666] font-display">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="h-[100vh] flex flex-col items-center justify-center section-padding pointer-events-auto">
          <div className="text-center glass-card p-16 w-full max-w-4xl reveal-text">
            <h2 className="font-display text-6xl md:text-8xl font-bold mb-8 text-[#0A0A0A] tracking-tighter">Connect.</h2>
            <p className="text-xl text-[#484848] mb-12 max-w-lg mx-auto">Available for innovative digital projects and high-precision development.</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a href="mailto:abdullahismail249@yahoo.com" className="btn-primary text-lg px-10 py-5 w-full md:w-auto">
                Email Me
              </a>
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/muhammad-abdullah-ismail/" target="_blank" rel="noreferrer" className="btn-outlined p-5 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://github.com/mabdullah-ismail" target="_blank" rel="noreferrer" className="btn-outlined p-5 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            
            <p className="mt-12 text-[#999] font-display text-xs uppercase tracking-widest">© 2026 GENO. Robotic Precision Design.</p>
          </div>
        </section>

      </div>
    </main>
  );
}
