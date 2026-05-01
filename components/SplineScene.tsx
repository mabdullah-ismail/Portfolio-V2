"use client";

import Spline from "@splinetool/react-spline";
import { Suspense, useRef, useEffect } from "react";
import gsap from "gsap";

export default function SplineScene() {
  const splineRef = useRef<any>(null);

  function onLoad(splineApp: any) {
    splineRef.current = splineApp;
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!splineRef.current) return;

      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;

      // Try to find the main robot group - common names in Spline exports
      const robot = splineRef.current.findObjectByName('Robot') 
                 || splineRef.current.findObjectByName('Group')
                 || splineRef.current.findObjectByName('Character');
      
      if (robot) {
        gsap.to(robot.rotation, {
          y: x * 0.4,
          x: y * 0.2,
          duration: 1,
          ease: "power2.out"
        });
      } else {
        // Fallback: rotate the camera slightly if robot not found
        const camera = splineRef.current.findObjectByName('Camera');
        if (camera) {
          gsap.to(camera.position, {
            x: x * 50,
            y: -y * 50,
            duration: 1,
            ease: "power2.out"
          });
        }
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  return (
    <Suspense fallback={null}>
      <Spline
        scene="/scene.splinecode"
        onLoad={onLoad}
        className="w-full h-full"
      />
    </Suspense>
  );
}
