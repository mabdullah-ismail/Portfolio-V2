"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "IDENTITY", href: "#bio", code: "01" },
  { label: "PROJECTS", href: "#projects", code: "02" },
  { label: "SKILLS", href: "#skills", code: "03" },
  { label: "ACHIEVEMENTS", href: "#achievements", code: "04" },
  { label: "CONTACT", href: "#contact", code: "05" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [time, setTime] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = NAV_ITEMS.map((item) =>
        document.querySelector(item.href)
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(NAV_ITEMS[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(href, { offset: -50 });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 transition-all duration-500"
      style={{
        zIndex: 25,
        background: isScrolled
          ? "rgba(3, 7, 18, 0.9)"
          : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled
          ? "1px solid var(--border-dim)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="relative">
              <div className="pulse-dot" />
            </div>
            <span
              className="font-display text-sm tracking-[0.2em] transition-colors duration-300"
              style={{ color: "var(--neon-cyan)" }}
            >
              M. ABDULLAH
            </span>
            <span
              className="text-[0.6rem] tracking-wider hidden sm:inline"
              style={{ color: "var(--text-muted)" }}
            >
              v2.1
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="relative px-3 py-2 text-[0.65rem] tracking-[0.15em] uppercase transition-all duration-300 group"
                style={{
                  color:
                    activeSection === item.href
                      ? "var(--neon-cyan)"
                      : "var(--text-secondary)",
                }}
              >
                <span
                  className="mr-1 opacity-40"
                  style={{
                    color:
                      activeSection === item.href
                        ? "var(--neon-cyan)"
                        : "var(--text-muted)",
                  }}
                >
                  {item.code}
                </span>
                {item.label}

                {/* Active indicator */}
                {activeSection === item.href && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[1px]"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, var(--neon-cyan), transparent)",
                    }}
                  />
                )}

                {/* Hover glow */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,240,255,0.05), transparent 70%)",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Right side: time + mobile toggle */}
          <div className="flex items-center gap-4">
            <div
              className="text-[0.6rem] tracking-[0.2em] font-mono hidden sm:block"
              style={{ color: "var(--text-muted)" }}
            >
              SYS.TIME:{" "}
              <span style={{ color: "var(--neon-green)" }}>{time}</span>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex flex-col gap-1 p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span
                className="block w-5 h-[1px] transition-all duration-300"
                style={{
                  background: "var(--neon-cyan)",
                  transform: mobileOpen
                    ? "rotate(45deg) translate(2px, 2px)"
                    : "none",
                }}
              />
              <span
                className="block w-5 h-[1px] transition-all duration-300"
                style={{
                  background: "var(--neon-cyan)",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-[1px] transition-all duration-300"
                style={{
                  background: "var(--neon-cyan)",
                  transform: mobileOpen
                    ? "rotate(-45deg) translate(2px, -2px)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: mobileOpen ? "400px" : "0",
          background: "rgba(3, 7, 18, 0.95)",
          backdropFilter: "blur(16px)",
          borderTop: mobileOpen ? "1px solid var(--border-dim)" : "none",
        }}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="block w-full text-left px-4 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300"
              style={{
                color:
                  activeSection === item.href
                    ? "var(--neon-cyan)"
                    : "var(--text-secondary)",
                borderLeft:
                  activeSection === item.href
                    ? "2px solid var(--neon-cyan)"
                    : "2px solid transparent",
              }}
            >
              <span className="opacity-40 mr-2">{item.code}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
