"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeatDeltaProps {
  label: string;
  before: string;
  after: string;
  active?: boolean;
}

// Before -> after, rendered as the forge's own device: a cold swatch giving
// way to a white-hot one. Both values are real, reported project numbers.
// Numerals sit beside the gradient, never on top of it — no flat text color
// survives cherry-red-to-white-heat, so the swatch stays purely visual.
export default function HeatDelta({ label, before, after, active = true }: HeatDeltaProps) {
  return (
    <div className="forge-panel rounded-sm p-4">
      <div className="font-sans text-[10px] text-ink-muted uppercase tracking-wide mb-3">
        {label}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 text-center">
          <div className="font-mono text-[9px] text-ink-subtle uppercase tracking-wide mb-1">
            before
          </div>
          <span className="font-mono instrument-figure text-xl text-ink-muted">{before}</span>
        </div>

        <ArrowRight size={16} className="text-ink-subtle flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="font-mono text-[9px] text-accent-orange uppercase tracking-wide mb-1">
            after
          </div>
          <span className="font-mono instrument-figure text-xl text-ink-display">{after}</span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={active ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-1.5 rounded-sm heat-fill mt-2 origin-left"
          />
        </div>
      </div>
    </div>
  );
}
