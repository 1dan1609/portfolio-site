"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal } from "lucide-react";

const NAV_ITEMS = [
  { label: "--about", href: "#about", short: "about" },
  { label: "--education", href: "#education", short: "education" },
  { label: "--experience", href: "#experience", short: "experience" },
  { label: "--projects", href: "#projects", short: "projects" },
  { label: "--contact", href: "#contact", short: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg-base/90 backdrop-blur-md border-b border-bg-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 font-mono text-terminal-green hover:text-terminal-green transition-colors group"
          >
            <Terminal size={16} className="group-hover:animate-pulse" />
            <span className="text-terminal-muted">~/</span>
            <span className="font-semibold">vandan</span>
            <span className="animate-blink text-terminal-green">▋</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActive(item.short)}
                className={`font-mono text-xs px-3 py-1.5 rounded transition-all duration-200 ${
                  active === item.short
                    ? "text-terminal-green bg-terminal-green/10 border border-terminal-green/30"
                    : "text-terminal-muted hover:text-terminal-white hover:bg-bg-elevated"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden text-terminal-muted hover:text-terminal-green transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-0 right-0 z-40 bg-bg-surface border-b border-bg-border md:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setMobileOpen(false);
                    setActive(item.short);
                  }}
                  className="font-mono text-sm px-3 py-2 rounded text-terminal-muted hover:text-terminal-green hover:bg-bg-elevated transition-all"
                >
                  <span className="text-terminal-green mr-2">$</span>
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
