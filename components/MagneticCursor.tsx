"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let targetX = 0;
    let targetY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setMouseX(e.clientX);
      setMouseY(e.clientY);
      if (!isVisible) {
        setIsVisible(true);
        document.body.style.cursor = "none";
      }
    };

    const handleMouseEnterInteractive = () => setIsHovering(true);
    const handleMouseLeaveInteractive = () => setIsHovering(false);

    // Animate cursor with lerp
    const animate = () => {
      cursorX += (targetX - cursorX) * 0.5;
      cursorY += (targetY - cursorY) * 0.5;
      ringX += (targetX - ringX) * 0.15;
      ringY += (targetY - ringY) * 0.15;

      if (cursor) cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
      if (ring) ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Add hover listeners to interactive elements
    const interactives = document.querySelectorAll(
      "a, button, .cyber-panel, .neon-btn, [data-magnetic]"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    const animFrame = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
      cancelAnimationFrame(animFrame);
    };
  }, [isVisible]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none"
        style={{
          zIndex: "var(--z-cursor)",
          background: "var(--neon-cyan)",
          boxShadow: "0 0 8px var(--neon-cyan), 0 0 20px var(--neon-cyan)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none"
        style={{
          zIndex: "var(--z-cursor)",
          border: `1px solid ${isHovering ? "var(--neon-magenta)" : "var(--neon-cyan)"}`,
          opacity: isVisible ? (isHovering ? 0.8 : 0.3) : 0,
          transform: isHovering ? "scale(1.5)" : "scale(1)",
          transition: "border-color 0.3s, opacity 0.3s, width 0.3s, height 0.3s",
          mixBlendMode: "screen",
        }}
      />

      {/* Crosshair lines (only on hover) */}
      <div
        className="fixed pointer-events-none transition-opacity duration-300"
        style={{
          zIndex: "var(--z-cursor)",
          left: 0,
          top: mouseY,
          width: "100vw",
          height: "1px",
          background: "var(--neon-magenta)",
          opacity: isHovering ? 0.1 : 0,
        }}
      />
      <div
        className="fixed pointer-events-none transition-opacity duration-300"
        style={{
          zIndex: "var(--z-cursor)",
          left: mouseX,
          top: 0,
          width: "1px",
          height: "100vh",
          background: "var(--neon-magenta)",
          opacity: isHovering ? 0.1 : 0,
        }}
      />

      {/* Target Corners (only on hover) */}
      {isHovering && (
        <div
          className="fixed pointer-events-none"
          style={{
            zIndex: "var(--z-cursor)",
            width: "40px",
            height: "40px",
            left: mouseX - 20,
            top: mouseY - 20,
          }}
        >
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-magenta-500" style={{ borderColor: "var(--neon-magenta)" }} />
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-magenta-500" style={{ borderColor: "var(--neon-magenta)" }} />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-magenta-500" style={{ borderColor: "var(--neon-magenta)" }} />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-magenta-500" style={{ borderColor: "var(--neon-magenta)" }} />
        </div>
      )}
    </>,
    document.body
  );
}
