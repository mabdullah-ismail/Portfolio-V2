"use client";

import Spline from "@splinetool/react-spline";
import { Suspense } from "react";

export default function SplineScene() {
  return (
    <Suspense fallback={null}>
      <Spline
        scene="/scene.splinecode"
        className="w-full h-full"
      />
    </Suspense>
  );
}
