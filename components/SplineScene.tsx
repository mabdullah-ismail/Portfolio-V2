"use client";

import Spline from "@splinetool/react-spline";
import { Suspense, forwardRef } from "react";

const SplineScene = forwardRef<any, { onLoad?: (spline: any) => void }>(({ onLoad }, ref) => {
  return (
    <div className="spline-container">
      <Suspense fallback={
        <div className="w-full h-full bg-black flex items-center justify-center text-cyan-500 font-mono animate-pulse">
          LINKING TO NEURAL MESH...
        </div>
      }>
        <Spline
          scene="https://prod.spline.design/ozPyac-j4wcgYmwu/scene.splinecode"
          onLoad={onLoad}
        />
      </Suspense>
    </div>
  );
});

SplineScene.displayName = "SplineScene";

export default SplineScene;
