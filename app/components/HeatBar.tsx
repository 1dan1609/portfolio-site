"use client";

import { motion } from "framer-motion";

interface HeatBarProps {
  label: string;
  value: number;
  max: number;
  unit?: string;
  active: boolean;
  delay?: number;
}

// A ruled scale with a heat-gradient fill and a marker at the real value —
// every bar here is a real resume figure, never a decorative animation.
export default function HeatBar({ label, value, max, unit = "", active, delay = 0 }: HeatBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  const ticks = 5;

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-sans text-[10px] text-ink-muted uppercase tracking-wide">
          {label}
        </span>
        <span className="font-mono instrument-figure text-lg text-accent-orange leading-none">
          {value.toLocaleString()}
          {unit}
        </span>
      </div>

      <div className="relative h-2 rounded-sm bg-board-black border border-board-line overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={active ? { width: `${pct}%` } : { width: "0%" }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full heat-fill"
        />
      </div>

      <div className="flex justify-between mt-1">
        {Array.from({ length: ticks }).map((_, i) => (
          <span key={i} className="font-mono text-[9px] text-ink-subtle">
            {Math.round((max / (ticks - 1)) * i).toLocaleString()}
          </span>
        ))}
      </div>
    </div>
  );
}
