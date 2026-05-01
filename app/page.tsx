"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplineScene from "@/components/SplineScene";
import CardSwap, { Card } from "@/components/CardSwap";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "EcoScan",
    role: "Founder / Startup",
    description: "Secured 4th Position at Shelby Stack. A sustainable tech solution focused on environmental impact and vision for green innovation.",
    tags: ["Sustainable Tech", "AI", "Startup"],
    link: "https://ecoscan-pk.web.app",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800"
  },
  {
    title: "Raise The Voice",
    role: "Unified Data Platform",
    description: "A community engagement initiative connecting Pakistan's law enforcement and judiciary for transparency and justice.",
    tags: ["Data Platform", "Social Impact", "DBMS"],
    link: "https://www.linkedin.com/in/muhammad-abdullah-ismail/details/projects/",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800"
  },
  {
    title: "Arch Tech",
    role: "Cybersecurity / Intern",
    description: "Focusing on network security, vulnerability assessments, and Python-based automation scripts for digital defense.",
    tags: ["Python", "Kali Linux", "Security"],
    link: "https://www.linkedin.com/in/muhammad-abdullah-ismail/",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800"
  },
  {
    title: "GDGoC BNU",
    role: "Leadership / Google Dev",
    description: "Lead of Media & Coverage. Managing video production and social marketing for the Google Developer Groups community.",
    tags: ["Media", "Leadership", "Community"],
    link: "https://www.linkedin.com/in/muhammad-abdullah-ismail/",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800"
  },
  {
    title: "OZI Publishing",
    role: "Game Dev / Intern",
    description: "Developed 3D simulations and Hyper-Casual Android games. Specialized in level design and Unity core logic.",
    tags: ["Unity", "C#", "Game Dev"],
    link: "https://www.linkedin.com/in/muhammad-abdullah-ismail/",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800"
  },
  {
    title: "SCIT Management",
    role: "Software Engineering",
    description: "A C++ & MySQL based University Management System streamlining academic operations through role-based access.",
    tags: ["C++", "MySQL", "OOP"],
    link: "https://github.com/mabdullah-ismail",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800"
  },
  {
    title: "ArcadeHub",
    role: "C++ Game Console",
    description: "Multi-game console featuring GeoGuesser, Problem Solver, and Hangman with dynamic leaderboards and file handling.",
    tags: ["C++", "Game Logic", "STL"],
    link: "https://github.com/mabdullah-ismail/Arcade-Hub",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800"
  }
];

export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);
  const cardSwapRef = useRef<any>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(false);
  
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

    // Ultra-Aggressive Spline Badge Nuke (Shadow DOM + Periodic Check)
    const nukeSpline = () => {
      // 1. Light DOM check
      const badges = document.querySelectorAll('a[href*="spline.design"], #spline-badge, .spline-watermark');
      badges.forEach(b => (b as HTMLElement).remove());

      // 2. Specific Shadow DOM search (spline-viewer and others)
      const viewers = document.querySelectorAll('spline-viewer, div, section, main');
      viewers.forEach(v => {
        if (v.shadowRoot) {
          const logo = v.shadowRoot.querySelector('#logo, a[href*="spline.design"], #spline-badge');
          if (logo) (logo as HTMLElement).remove();
        }
      });
    };

    const interval = setInterval(nukeSpline, 500);

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

    // Spline Zoom & Movement Animation
    gsap.to(".spline-container", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
      scale: 1.2,
      y: 50,
      ease: "power1.inOut",
    });

    // Navigation Visibility for Work Section
    ScrollTrigger.create({
      trigger: "#experience",
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        setIsNavVisible(self.isActive);
      }
    });

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
      clearInterval(interval);
    };
  }, []);

  const handleNav = (direction: 'prev' | 'next') => {
    if (cardSwapRef.current) {
      if (direction === 'next') {
        cardSwapRef.current.next();
      } else {
        cardSwapRef.current.prev();
      }
    }
  };

  return (
    <main className="relative bg-[#E5E5E5] text-[#0A0A0A] overflow-hidden font-sans">
      {/* Fixed 3D Spline Background */}
      <div className="spline-container">
        <SplineScene />
      </div>

      {/* DOM Overlay Content */}
      <div className="relative z-10 pointer-events-none">
        
        {/* Navigation / Header */}
        <header className="fixed top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
          <div className="font-display font-bold text-lg md:text-xl tracking-tight uppercase">GENO</div>
          <div className="hidden md:flex gap-8 font-display text-sm uppercase tracking-widest">
            <span className="cursor-pointer hover:opacity-50 transition-opacity pointer-events-auto" onClick={() => (window as any).lenis?.scrollTo('#about')}>About</span>
            <span className="cursor-pointer hover:opacity-50 transition-opacity pointer-events-auto" onClick={() => (window as any).lenis?.scrollTo('#experience')}>Work</span>
            <span className="cursor-pointer hover:opacity-50 transition-opacity pointer-events-auto" onClick={() => (window as any).lenis?.scrollTo('#contact')}>Contact</span>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="h-[100vh] flex flex-col items-center justify-center pointer-events-auto relative px-6">
          <div className="hero-content text-center pointer-events-none">
            <h1 className="text-[12vw] md:heading-massive mix-blend-difference text-white leading-[1.1] md:leading-none">
              ABDULLAH
            </h1>
            <p className="mt-4 font-display text-[10px] md:text-base tracking-[0.2em] md:tracking-[0.4em] uppercase text-[#0A0A0A] font-semibold bg-white/20 backdrop-blur-md px-4 py-2 inline-block max-w-[80vw]">
              Redefining Digital Boundaries Through AI & Security
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-[100vh] flex items-center section-padding pointer-events-auto">
          <div className="max-w-3xl glass-card p-8 md:p-16 reveal-text mx-auto md:mx-0">
            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 md:mb-8 text-[#0A0A0A]">Profile.</h2>
            <p className="text-lg md:text-2xl leading-relaxed text-[#484848] font-light">
              I am M. Abdullah, a multi-disciplinary developer and lead based in Lahore. 
              Currently exploring the intersection of <strong className="font-bold text-[#0A0A0A]">Cybersecurity</strong>, <strong className="font-bold text-[#0A0A0A]">Game Development</strong>, and <strong className="font-bold text-[#0A0A0A]">AI Automation</strong>. 
              My work focuses on building robust digital systems with robotic precision and minimalist aesthetics.
            </p>
            <div className="mt-8 md:mt-12 flex flex-wrap gap-4">
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

        {/* Projects Stack Section */}
        <section id="experience" className="min-h-[100vh] flex flex-col items-center justify-center section-padding pointer-events-auto overflow-hidden">
          <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-16 md:gap-24">
            
            {/* Left side: Project Info */}
            <div className="w-full md:w-1/2 reveal-text">
              <div className="font-display text-[10px] text-[#888] uppercase tracking-[0.3em] font-bold mb-4">Portfolio</div>
              <h2 className="font-display text-5xl md:text-8xl font-bold mb-8 text-[#0A0A0A] leading-[0.9]">SELECTED WORK.</h2>
              
              <div 
                className="glass-card p-8 md:p-12 relative overflow-hidden group border-black/5 cursor-pointer pointer-events-auto active:scale-[0.98] transition-transform"
                onClick={() => cardSwapRef.current?.bringToFront(currentProject)}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="font-display text-[10px] text-[#888] uppercase tracking-[0.3em] font-bold">{PROJECTS[currentProject].role}</div>
                  <a 
                    href={PROJECTS[currentProject].link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-black text-white hover:bg-[#333] transition-colors pointer-events-auto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
                <h3 className="font-display text-3xl md:text-5xl font-bold mb-6 text-[#0A0A0A] transition-all duration-500">
                  {PROJECTS[currentProject].title}
                </h3>
                <p className="text-lg text-[#484848] mb-10 leading-relaxed font-light transition-all duration-500">
                  {PROJECTS[currentProject].description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {PROJECTS[currentProject].tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 border border-black/10 text-[10px] uppercase tracking-[0.1em] text-[#666] font-display font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Right side: Interactive Card Stack */}
            <div className="w-full md:w-1/2 flex justify-center items-center h-[500px] pointer-events-auto">
              <CardSwap
                ref={cardSwapRef}
                width="100%"
                height={450}
                cardDistance={30}
                verticalDistance={30}
                delay={3000}
                pauseOnHover={true}
                skewAmount={3}
                onCardClick={(idx) => {
                  setCurrentProject(idx);
                  cardSwapRef.current?.bringToFront(idx);
                }}
                onSwap={(idx) => setCurrentProject(idx)}
              >
                {PROJECTS.map((project, index) => (
                  <Card 
                    key={index} 
                    className={`overflow-hidden border-none shadow-2xl transition-all duration-700 group cursor-pointer ${index === currentProject ? 'ring-2 ring-black/10' : ''}`}
                    style={{ width: '100%', maxWidth: '400px' }}
                  >
                    <div className="relative h-full w-full bg-white">
                      {/* Card Content */}
                      <div className="relative p-8 md:p-12 h-full flex flex-col justify-between z-10">
                        <div className="flex justify-between items-start">
                          <div className={`w-12 h-1 transition-colors duration-500 ${index === currentProject ? 'bg-black' : 'bg-black/10'}`} />
                          <div className="font-display text-[10px] font-bold text-[#aaa]">{String(index + 1).padStart(2, '0')}</div>
                        </div>
                        
                        <div>
                          <div className="font-display text-[10px] text-[#888] uppercase tracking-[0.3em] font-bold mb-2">{project.role}</div>
                          <h4 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-[0.9] text-[#0A0A0A]">{project.title}</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                              <span key={i} className="text-[9px] uppercase tracking-tighter text-[#888] border border-black/5 px-2 py-1">{tag}</span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-[#aaa] font-bold">Details</span>
                          <svg className="w-4 h-4 text-[#aaa]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="h-[100vh] flex flex-col items-center justify-center section-padding pointer-events-auto">
          <div className="text-center glass-card p-8 md:p-16 w-full max-w-4xl reveal-text">
            <h2 className="font-display text-4xl md:text-8xl font-bold mb-4 md:mb-8 text-[#0A0A0A] tracking-tighter uppercase">Connect.</h2>
            <p className="text-lg md:text-xl text-[#484848] mb-8 md:mb-12 max-w-lg mx-auto">Available for innovative digital projects and high-precision development.</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
              <a href="mailto:abdullahismail249@yahoo.com" className="btn-primary text-lg px-10 py-4 md:py-5 w-full md:w-auto">
                Email Me
              </a>
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/muhammad-abdullah-ismail/" target="_blank" rel="noreferrer" className="btn-outlined p-4 md:p-5 transition-colors">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="https://github.com/mabdullah-ismail" target="_blank" rel="noreferrer" className="btn-outlined p-4 md:p-5 transition-colors">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            
          </div>
        </section>

      </div>

    </main>
  );
}
