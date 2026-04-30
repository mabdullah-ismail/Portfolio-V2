"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamic imports for code splitting
const BootScreen = dynamic(() => import("@/components/BootScreen"), { ssr: false });
const CRTOverlay = dynamic(() => import("@/components/CRTOverlay"), { ssr: false });
const MagneticCursor = dynamic(() => import("@/components/MagneticCursor"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Bio = dynamic(() => import("@/components/Bio"), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects"), { ssr: false });
const Skills = dynamic(() => import("@/components/Skills"), { ssr: false });
const Achievements = dynamic(() => import("@/components/Achievements"), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact"), { ssr: false });
const TerminalLog = dynamic(() => import("@/components/TerminalLog"), { ssr: false });
const SplineScene = dynamic(() => import("@/components/SplineScene"), { ssr: false });
const ErrorBoundary = dynamic(() => import("@/components/ErrorBoundary"), { ssr: false });
const HolographicEarth = dynamic(() => import("@/components/HolographicEarth"), { ssr: false });
const GlitchOverlay = dynamic(() => import("@/components/GlitchOverlay"), { ssr: false });

const SplineFallback = () => <HolographicEarth />;

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(true);
  const splineRef = useRef<any>(null);
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    // Remove boot screen from DOM after fade
    setTimeout(() => setShowBoot(false), 1000);

    // Initial "GTA" Transition
    if (splineRef.current) {
      try {
        splineRef.current.emitEvent('mouseHover', 'TerminalView');
      } catch (e) {
        console.warn("Spline state 'TerminalView' not found");
      }
    }
  }, []);

  // Initialize Lenis and GSAP ScrollTrigger
  useEffect(() => {
    if (!booted) return;

    // Smooth Scroll
    const lenis = new Lenis();
    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    // Camera & Container Scroll Animation (The "Moving Earth" effect)
    if (splineContainerRef.current) {
      // 1. Initial State: Hidden
      gsap.set(splineContainerRef.current, { opacity: 0 });

      // 2. Fade in after Hero section and keep visible
      gsap.to(splineContainerRef.current, {
        scrollTrigger: {
          trigger: "#hero",
          start: "bottom center", // Start fading in as hero leaves
          end: "bottom top",    // Fully visible when hero is gone
          scrub: true,
        },
        opacity: 1,
        ease: "power2.inOut"
      });

    }

    return () => {
      lenis.destroy();
    };
  }, [booted]);

  // Prevent scroll during boot
  useEffect(() => {
    if (!booted) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  const onSplineLoad = (spline: any) => {
    splineRef.current = spline;
    console.log("Spline Scene Loaded");
  };

  return (
    <main className="relative min-h-[100svh]">
      {/* Glitch Overlay - Desktop Only */}
      <div className="hidden md:block">
        <GlitchOverlay />
      </div>

      {/* 3D Background Layer */}
      <div 
        ref={splineContainerRef} 
        style={{ opacity: 0, transform: 'translateY(0)' }} 
        className="fixed inset-0 z-10 pointer-events-none flex items-center justify-center"
      >
        <ErrorBoundary fallback={<HolographicEarth />}>
          <SplineScene onLoad={onSplineLoad} />
        </ErrorBoundary>
      </div>

      {/* Background grid overlay */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" style={{ zIndex: 11 }} />

      {/* Boot screen */}
      {showBoot && <BootScreen onComplete={handleBootComplete} />}

      {/* CRT overlay - Desktop Only */}
      <div className="hidden md:block">
        <CRTOverlay />
      </div>

      {/* Custom cursor (desktop only) */}
      <MagneticCursor />

      {/* Navigation */}
      {booted && <Navbar />}

      {/* Content sections */}
      <div className="relative chromatic-aberration" style={{ zIndex: "var(--z-ui)" }}>
        <Hero isReady={booted} />

        <div className="max-w-6xl mx-auto px-6">
          <div className="cyber-divider" />
        </div>

        <Bio />

        <div className="max-w-6xl mx-auto px-6">
          <div className="cyber-divider" />
        </div>

        <Projects />

        <div className="max-w-6xl mx-auto px-6">
          <div className="cyber-divider" />
        </div>

        <Skills />

        <div className="max-w-6xl mx-auto px-6">
          <div className="cyber-divider" />
        </div>

        <Achievements />

        <div className="max-w-6xl mx-auto px-6">
          <div className="cyber-divider" />
        </div>

        <Contact />

        {/* Footer spacer for terminal log */}
        <div className="h-16" />
      </div>

      {/* Terminal HUD footer */}
      {booted && <TerminalLog />}
    </main>
  );
}
