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
  
  // Custom preloader simulation since Spline onLoad doesn't give precise %
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

  // Smooth Scroll & GSAP setup
  useEffect(() => {
    if (!loaded) return;

    // Smooth Scroll
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

  const onSplineLoad = (splineApp: any) => {
    console.log("Spline loaded", splineApp);
    // Ideally we would link GSAP to Spline camera here, but without knowing the exact object names
    // in the Spline file (like 'Camera 2'), we rely on Spline's built-in interactivity for now.
  };

  return (
    <main className="relative bg-[#E3E3E3] text-[#111] overflow-hidden">
      {/* Preloader */}
      <div className={`preloader ${loaded ? 'fade-out' : ''}`}>
        <h1 className="font-bold text-2xl tracking-widest uppercase">INITIALIZING NABOT</h1>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Fixed 3D Spline Background */}
      <div className="spline-container">
        <SplineScene onLoad={onSplineLoad} />
      </div>

      {/* DOM Overlay Content */}
      <div className="relative z-10 pointer-events-none">
        
        {/* Hero Section */}
        <section id="hero" className="h-[100vh] flex flex-col items-center justify-center pointer-events-auto">
          <h1 className="hero-title heading-massive text-center mix-blend-difference text-white">
            NABOT
          </h1>
          <p className="hero-title mt-4 text-sm uppercase tracking-widest text-center mix-blend-difference text-white">
            SCROLL TO EXPLORE
          </p>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-[100vh] flex items-center section-padding pointer-events-auto">
          <div className="max-w-2xl bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">About Me</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              I am M. Abdullah. Exploring the intersection of AI Automation, Game Development, and Cyber Security. 
              This digital space represents my transition from pure cyberpunk aesthetics to minimalist, functional 3D scrollytelling.
            </p>
          </div>
        </section>

        {/* Portfolio Horizontal Scroll Section */}
        <section id="portfolio-container" className="h-[100vh] pointer-events-auto overflow-hidden">
          <div className="horizontal-scroll-container">
            <div className="horizontal-panel">
              <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-xl">
                <h3 className="text-3xl font-bold mb-4">Project 01</h3>
                <p>AI Automation Engine.</p>
              </div>
            </div>
            <div className="horizontal-panel">
              <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-xl">
                <h3 className="text-3xl font-bold mb-4">Project 02</h3>
                <p>Cyber Security Framework.</p>
              </div>
            </div>
            <div className="horizontal-panel">
              <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-xl">
                <h3 className="text-3xl font-bold mb-4">Project 03</h3>
                <p>Game Dev Physics Engine.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="h-[100vh] flex items-center justify-center section-padding pointer-events-auto">
          <div className="text-center bg-white/80 backdrop-blur-md p-12 rounded-3xl shadow-xl max-w-xl">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">Let's Talk</h2>
            <p className="text-gray-600 mb-8">Ready to build the future?</p>
            <a href="mailto:abdullahismail249@yahoo.com" className="inline-block bg-black text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform">
              abdullahismail249@yahoo.com
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
