"use client";

export default function CRTOverlay() {
  return (
    <>
      {/* Scanline overlay */}
      <div className="crt-overlay" aria-hidden="true" />

      {/* Moving scanline */}
      <div
        className="fixed inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: "var(--z-overlay)" }}
      >
        <div
          className="w-full h-[2px] opacity-[0.04]"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--neon-cyan), transparent)",
            animation: "scanline 6s linear infinite",
          }}
        />
      </div>
    </>
  );
}
