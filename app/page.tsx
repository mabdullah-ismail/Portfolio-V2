"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import SplineScene from "@/components/SplineScene";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setLoaded(true), 500);
      }
      setProgress(currentProgress);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loaded) return;

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
    gsap.to(".hero-title", {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0,
      y: -100,
    });

    // Horizontal Scroll for Portfolio
    const panels = gsap.utils.toArray(".horizontal-panel");
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#portfolio-container",
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + document.querySelector("#portfolio-container")?.offsetWidth
      }
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loaded]);

  return (
    <main className="relative bg-[#E5E5E5] text-[#0A0A0A] overflow-hidden">
      {/* Preloader */}
      <div className={`preloader ${loaded ? 'fade-out' : ''}`}>
        <h1 className="font-display font-bold text-2xl tracking-widest uppercase">INITIALIZING</h1>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Fixed 3D Spline Background */}
      <div className="spline-container">
        <SplineScene />
      </div>

      {/* DOM Overlay Content */}
      <div className="relative z-10 pointer-events-none">
        
        {/* Navigation / Header */}
        <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
          <div className="font-display font-bold text-xl tracking-tight">ABDULLAH</div>
          <div className="hidden md:flex gap-8 font-display text-sm uppercase tracking-widest">
            <span className="cursor-pointer hover:opacity-50 transition-opacity pointer-events-auto" onClick={() => (window as any).lenis?.scrollTo('#about')}>About</span>
            <span className="cursor-pointer hover:opacity-50 transition-opacity pointer-events-auto" onClick={() => (window as any).lenis?.scrollTo('#portfolio-container')}>Work</span>
            <span className="cursor-pointer hover:opacity-50 transition-opacity pointer-events-auto" onClick={() => (window as any).lenis?.scrollTo('#contact')}>Contact</span>
          </div>
        </header>

        {/* Hero Section */}
        <section id="hero" className="h-[100vh] flex flex-col items-center justify-center pointer-events-auto relative">
          <h1 className="hero-title heading-massive text-center mix-blend-difference text-white pointer-events-none">
            ABDULLAH
          </h1>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-[100vh] flex items-center section-padding pointer-events-auto">
          <div className="max-w-3xl glass-card p-12 md:p-16">
            <h2 className="font-display text-5xl md:text-6xl font-bold mb-8 text-[#0A0A0A]">About.</h2>
            <p className="text-xl md:text-2xl leading-relaxed text-[#484848] font-light">
              I am Abdullah. Exploring the intersection of AI Automation, Game Development, and Cyber Security. 
              This digital space is built on the principles of minimal futurism and robotic precision.
            </p>
            <div className="mt-12 flex gap-4">
              <button className="btn-primary" onClick={() => (window as any).lenis?.scrollTo('#portfolio-container')}>
                View Work
              </button>
              <a href="https://linkedin.com/in/muhammad-abdullah-ismail/" target="_blank" rel="noreferrer" className="btn-outlined">
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Portfolio Horizontal Scroll Section */}
        <section id="portfolio-container" className="h-[100vh] pointer-events-auto overflow-hidden">
          <div className="horizontal-scroll-container">
            <div className="horizontal-panel">
              <div className="glass-card p-12 rounded-none max-w-2xl w-full mx-6">
                <div className="font-display text-sm text-[#484848] uppercase tracking-widest mb-4">01 / Project</div>
                <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#0A0A0A]">AI Automation Engine</h3>
                <p className="text-lg text-[#484848]">Automated intelligent workflows replacing redundant manual operations with precision AI.</p>
              </div>
            </div>
            <div className="horizontal-panel">
              <div className="glass-card p-12 rounded-none max-w-2xl w-full mx-6">
                <div className="font-display text-sm text-[#484848] uppercase tracking-widest mb-4">02 / Project</div>
                <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#0A0A0A]">Cyber Security Framework</h3>
                <p className="text-lg text-[#484848]">Advanced penetration testing protocols and vulnerability assessment algorithms.</p>
              </div>
            </div>
            <div className="horizontal-panel">
              <div className="glass-card p-12 rounded-none max-w-2xl w-full mx-6">
                <div className="font-display text-sm text-[#484848] uppercase tracking-widest mb-4">03 / Project</div>
                <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 text-[#0A0A0A]">Game Dev Physics Engine</h3>
                <p className="text-lg text-[#484848]">Custom highly-optimized rigid body dynamics built specifically for real-time web experiences.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="h-[100vh] flex flex-col items-center justify-center section-padding pointer-events-auto">
          <div className="text-center glass-card p-16 w-full max-w-4xl">
            <h2 className="font-display text-6xl md:text-8xl font-bold mb-8 text-[#0A0A0A] tracking-tighter">Contact.</h2>
            <p className="text-xl text-[#484848] mb-12 max-w-lg mx-auto">Available for freelance opportunities and long-term robotic precision projects.</p>
            <a href="mailto:abdullahismail249@yahoo.com" className="btn-primary text-lg px-10 py-5">
              abdullahismail249@yahoo.com
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
