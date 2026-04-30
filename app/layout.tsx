import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M. ABDULLAH | Portfolio",
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
    title: "M. ABDULLAH | Portfolio",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#E5E5E5] text-[#0A0A0A] font-sans antialiased selection:bg-[#0A0A0A] selection:text-[#FFFFFF]">{children}</body>
    </html>
  );
}
