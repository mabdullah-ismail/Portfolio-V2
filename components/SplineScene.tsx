"use client";

import Spline from "@splinetool/react-spline";
import { Suspense } from "react";

export default function SplineScene() {
  return (
    <Suspense fallback={null}>
      <Spline
        scene="https://prod.spline.design/CZ5FWh4w2dkU889E/scene.splinecode"
        className="w-full h-full"
      />
    </Suspense>
  );
}
