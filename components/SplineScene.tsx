"use client";

import Spline from "@splinetool/react-spline";
import { Suspense, forwardRef } from "react";

const SplineScene = forwardRef<any, { onLoad?: (spline: any) => void }>(({ onLoad }, ref) => {
  return (
    <div className="spline-container">
      <Suspense fallback={
        <div className="w-full h-full bg-[#E5E5E5] flex items-center justify-center text-[#0A0A0A] font-display animate-pulse tracking-widest text-sm uppercase">
          Loading 3D Core...
        </div>
      }>
        <Spline
          scene="https://prod.spline.design/CZ5FWh4w2dkU889E/scene.splinecode"
          onLoad={onLoad}
        />
      </Suspense>
    </div>
  );
});

SplineScene.displayName = "SplineScene";

export default SplineScene;
