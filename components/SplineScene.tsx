"use client";

import Spline from "@splinetool/react-spline";
import { Suspense, useRef } from "react";
import gsap from "gsap";

export default function SplineScene() {
  const splineRef = useRef<any>(null);

  function onLoad(splineApp: any) {
    splineRef.current = splineApp;
  }

  // Handle mouse move to rotate the scene slightly
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!splineRef.current) return;

    // Calculate rotation based on mouse position
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;

    // Find the main robot group or the whole scene
    // Usually, we can try to find an object named 'Robot' or similar
    // For now, we'll apply a gentle parallax to the whole scene
    const obj = splineRef.current.findObjectByName('Robot') || splineRef.current.findObjectById('scene');
    
    if (obj) {
      gsap.to(obj.rotation, {
        y: x * 0.5,
        x: y * 0.2,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  return (
    <div className="w-full h-full" onMouseMove={handleMouseMove}>
      <Suspense fallback={null}>
        <Spline
          scene="/scene.splinecode"
          onLoad={onLoad}
          className="w-full h-full"
        />
      </Suspense>
    </div>
  );
}
