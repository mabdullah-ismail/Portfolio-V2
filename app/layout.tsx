import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GENO | M. ABDULLAH",
  description:
    "An immersive 3D portfolio experience featuring Robotic Precision and Minimalist Design. Cybersecurity enthusiast and Game Developer.",
  icons: {
    icon: "/icon.jpg",
  },
  keywords: [
    "portfolio",
    "developer",
    "cybersecurity",
    "3D",
    "game dev",
    "minimalist",
    "geno",
  ],
  authors: [{ name: "M. ABDULLAH" }],
  openGraph: {
    title: "GENO | M. ABDULLAH",
    description:
      "An immersive 3D portfolio experience featuring Robotic Precision and Minimalist Design.",
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
