"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, ArrowRight, BrainCircuit, Layers, ShieldAlert, Check } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";
import HeatDelta from "./HeatDelta";
import HeatBar from "./HeatBar";

// Real, sourced numbers pulled from across the portfolio — never a single
// project mislabeled as general "impact."
const IMPACT_STATS = [
  { value: "5,000+", label: "Users scaled", source: "Skedaddle" },
  { value: "60.3%", label: "Adversarial accuracy recovered", source: "AI Defenses" },
  { value: "8,000+", label: "Municipal docs synced", source: "CivicAI" },
  { value: "90%", label: "RE time saved", source: "Malware Lab" },
];

const PILLARS = [
  {
    Icon: BrainCircuit,
    title: "RAG/LLM Systems",
    body: "Production retrieval-augmented systems shipped to real users, not demos.",
    target: "#projects",
  },
  {
    Icon: Layers,
    title: "Full-Stack & Mobile",
    body: "Next.js, FastAPI, Kotlin, Flutter — shipped end to end, GCP to app store.",
    target: "#projects",
  },
  {
    Icon: ShieldAlert,
    title: "Security Research",
    body: "Malware reverse engineering, YARA authoring, adversarial ML defenses.",
    target: "#experience",
  },
];

const STACK_CERTIFIED = ["Python", "TypeScript", "Next.js", "Vertex AI", "Ghidra", "Kotlin"];

export default function Hero() {
  const { personal } = portfolioData;
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setTickerIndex((i) => (i + 1) % IMPACT_STATS.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative bg-forge px-6 md:pl-28 pt-14 pb-16 md:pt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pt-6"
          >
            <div
              className="bg-accent-orange text-board-black inline-block px-4 rounded-sm mb-6"
              style={{ paddingTop: "var(--p-bar-weight, 0.75rem)", paddingBottom: "var(--p-bar-weight, 0.75rem)" }}
            >
              <span className="font-sans font-black uppercase tracking-wide text-xl">
                {personal.name}
              </span>
              <span className="font-mono text-xs text-board-black/70 ml-2 align-middle">
                {personal.location}
              </span>
            </div>

            <h1 className="stencil-display text-[15vw] sm:text-6xl md:text-7xl uppercase mb-6">
              Built under
              <br />
              load. Shipped
              <br />
              at scale.
            </h1>

            <p className="font-sans text-base text-ink-body/85 max-w-xl leading-relaxed mb-8">
              Software Engineer shipping production RAG/LLM systems, full-stack
              &amp; mobile engineering, and hands-on security research.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <a
                href="#projects"
                className="flex items-center gap-2 bg-accent-orange text-board-black font-sans font-bold text-sm px-5 py-3 rounded-sm hover:bg-accent-heat transition-colors"
              >
                View Releases
                <ArrowRight size={15} />
              </a>
              <a
                href="/resume"
                className="flex items-center gap-2 border border-board-line text-ink-body font-sans font-medium text-sm px-5 py-3 rounded-sm hover:border-accent-orange hover:text-accent-orange transition-colors"
              >
                <FileDown size={15} />
                View Resume
              </a>
            </div>

            <div className="flex items-center gap-4 font-mono text-xs text-ink-subtle">
              <span>
                CURRENT BUILD <span className="text-ink-muted">v2026.09</span>
              </span>
              <span className="w-px h-3 bg-board-line" />
              <span className="flex items-center gap-1.5">
                <span className="pulse-dot" />
                STATUS: ONLINE
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="forge-panel rounded-sm p-4 sm:p-5 h-full flex flex-col"
          >
            <div className="flex items-center gap-2 font-sans text-[11px] text-ink-muted uppercase tracking-wide">
              <span className="pulse-dot" />
              Portfolio Impact — Live
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tickerIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="font-mono instrument-figure text-6xl sm:text-7xl text-accent-orange leading-none">
                  {IMPACT_STATS[tickerIndex].value}
                </div>
                <div className="font-sans text-base text-ink-body/85 mt-4">
                  {IMPACT_STATS[tickerIndex].label}
                </div>
                <div className="font-mono text-xs text-ink-subtle uppercase tracking-wide mt-2">
                  {IMPACT_STATS[tickerIndex].source}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="h-1 rounded-sm bg-board-black border border-board-line overflow-hidden mb-4">
              <div
                className="h-full heat-fill transition-all duration-500"
                style={{ width: `${((tickerIndex + 1) / IMPACT_STATS.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-4">
              {IMPACT_STATS.map((stat, i) => (
                <span
                  key={stat.label}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === tickerIndex ? "bg-accent-orange" : "bg-board-line"
                  }`}
                />
              ))}
            </div>

            <a
              href="#projects"
              className="flex items-center justify-end gap-1.5 font-mono text-[10px] text-ink-muted hover:text-accent-orange transition-colors uppercase tracking-wide pt-4 border-t border-board-line"
            >
              View Releases
              <ArrowRight size={11} />
            </a>
          </motion.div>
        </div>

        {/* ── Pillar tiles ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14"
        >
          <div className="section-heading mb-5">Built for what matters</div>
          <div className="grid sm:grid-cols-3 gap-4">
            {PILLARS.map((p) => (
              <a
                key={p.title}
                href={p.target}
                className="forge-panel rounded-sm p-5 hover:border-accent-orange/50 transition-colors group"
              >
                <p.Icon size={22} className="text-accent-orange mb-3" strokeWidth={1.75} />
                <div className="font-sans font-bold text-sm text-ink-display mb-1.5 uppercase tracking-wide">
                  {p.title}
                </div>
                <p className="font-sans text-xs text-ink-muted leading-relaxed">{p.body}</p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Stack certified strip ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 forge-panel rounded-sm px-5 py-4 flex flex-wrap items-center gap-x-6 gap-y-2"
        >
          <span className="font-sans text-[11px] text-ink-muted uppercase tracking-wide">
            Stack —
          </span>
          {STACK_CERTIFIED.map((s) => (
            <span key={s} className="flex items-center gap-1.5 font-mono text-xs text-ink-body">
              <Check size={12} className="text-accent-orange" />
              {s}
            </span>
          ))}
          <a
            href="#skills"
            className="ml-auto font-sans text-[11px] text-ink-muted hover:text-accent-orange transition-colors uppercase tracking-wide"
          >
            View full stack →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
