"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";

function EarthModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y = time * 0.15;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = time * 0.05;
    }
  });

  return (
    <group scale={2.2}>
      {/* Floating animation for the whole group */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Core Wireframe Earth */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.2}
            emissive="#00f0ff"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Cloud Layer (secondary wireframe) */}
        <mesh ref={cloudRef}>
          <sphereGeometry args={[1.05, 32, 32]} />
          <meshStandardMaterial
            color="#ff00e5"
            wireframe
            transparent
            opacity={0.1}
            emissive="#ff00e5"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Atmosphere Glow */}
        <mesh ref={atmosphereRef}>
          <sphereGeometry args={[1.1, 32, 32]} />
          <meshPhongMaterial
            color="#00f0ff"
            transparent
            opacity={0.03}
            side={THREE.BackSide}
          />
        </mesh>
      </Float>

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00e5" />
    </group>
  );
}

export default function HolographicEarth() {
  return (
    <div className="spline-container overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <Suspense fallback={null}>
          <EarthModel />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
      
      {/* Fallback Overlay Info */}
      <div className="absolute bottom-10 left-10 z-20 font-mono text-[0.6rem] tracking-widest opacity-40 uppercase pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
          <div className="pulse-dot" />
          <span>3D Engine: Holographic Fallback Active</span>
        </div>
        <div>Render Node: Local Three.js / Neural Mesh</div>
      </div>
    </div>
  );
}
