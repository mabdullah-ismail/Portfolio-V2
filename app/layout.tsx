import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M. ABDULLAH | Cyberpunk Portfolio Terminal",
  description:
    "An immersive cyberpunk 3D portfolio experience. Game Developer and Cybersecurity enthusiast terminal featuring interactive projects, skills, and achievements.",
  keywords: [
    "portfolio",
    "developer",
    "cyberpunk",
    "3D",
    "full-stack",
    "terminal",
    "interactive",
  ],
  authors: [{ name: "M. ABDULLAH" }],
  openGraph: {
    title: "M. ABDULLAH | Cyberpunk Portfolio Terminal",
    description:
      "An immersive cyberpunk 3D portfolio experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#030712] text-white selection:bg-cyan-500/30 selection:text-cyan-500">{children}</body>
    </html>
  );
}
