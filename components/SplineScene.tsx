"use client";

import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <div className="spline-container">
      <Spline
        scene="https://prod.spline.design/CZ5FWh4w2dkU889E/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
