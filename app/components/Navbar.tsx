"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CircuitBoard, User, Wrench, GitCommitVertical, Package, Send } from "lucide-react";

const NAV_ITEMS = [
  { label: "Profile", href: "/#about", short: "about", Icon: User },
  { label: "Stack", href: "/#skills", short: "skills", Icon: Wrench },
  { label: "Build Log", href: "/#experience", short: "experience", Icon: GitCommitVertical },
  { label: "Releases", href: "/#projects", short: "projects", Icon: Package },
  { label: "Deploy", href: "/#contact", short: "contact", Icon: Send },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const pathname = usePathname();

  // On the landing page, track scroll position; on a sub-route (project
  // detail, resume), fall back to marking the section that route belongs to.
  useEffect(() => {
    if (pathname !== "/") {
      setActive(pathname.startsWith("/projects") ? "projects" : "");
      return;
    }

    const sections = NAV_ITEMS.map((i) => document.getElementById(i.short)).filter(
      (el): el is HTMLElement => !!el
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Landing on "/" from a different route with a hash (e.g. clicking a rail
  // item from /projects/[slug]) doesn't reliably auto-scroll to the anchor —
  // a known Next.js App Router rough edge with plain <a> cross-route hash
  // links. Do it explicitly once the target section exists in the DOM.
  useEffect(() => {
    if (pathname !== "/" || !window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [pathname]);

  return (
    <>
      {/* Desktop: fixed left icon rail */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 z-50 w-20 flex-col items-center py-6 bg-board-panel border-r border-board-line">
        <a
          href="/"
          aria-label="Home"
          className="flex items-center justify-center w-10 h-10 rounded-sm mb-8 text-accent-orange hover:text-accent-heat transition-colors"
        >
          <CircuitBoard size={22} strokeWidth={1.75} />
        </a>

        <div className="flex flex-col gap-2 flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.short;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center gap-1.5 w-16 py-3 rounded-sm transition-colors group ${
                  isActive ? "text-accent-orange" : "text-ink-muted hover:text-ink-body"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-accent-orange rounded-r-sm" />
                )}
                <item.Icon size={18} strokeWidth={1.75} />
                <span className="font-sans text-[9px] uppercase tracking-wide">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        <div className="flex flex-col items-center gap-1.5 text-ink-subtle">
          <span className="pulse-dot" />
          <span className="font-mono text-[8px] uppercase tracking-wide [writing-mode:vertical-rl] rotate-180">
            online
          </span>
        </div>
      </nav>

      {/* Mobile: fixed bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-stretch bg-board-panel border-t border-board-line">
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.short;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
                isActive ? "text-accent-orange" : "text-ink-muted"
              }`}
            >
              <item.Icon size={17} strokeWidth={1.75} />
              <span className="font-sans text-[9px] uppercase tracking-wide">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
