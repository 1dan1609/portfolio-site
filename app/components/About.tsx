"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import portfolioData from "@/content/portfolio-data.json";

const SKILL_CATEGORY_COLORS: Record<string, string> = {
  languages: "border-terminal-green/40 text-terminal-green bg-terminal-green/10",
  frameworks: "border-terminal-blue/40 text-terminal-blue bg-terminal-blue/10",
  tools: "border-terminal-yellow/40 text-terminal-yellow bg-terminal-yellow/10",
  specialized: "border-terminal-purple/40 text-terminal-purple bg-terminal-purple/10",
  os: "border-terminal-cyan/40 text-terminal-cyan bg-terminal-cyan/10",
};

const CATEGORY_LABELS: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks & Libraries",
  tools: "Dev Tools",
  specialized: "Specialized Systems",
  os: "Operating Systems",
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { skills } = portfolioData;

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" ref={ref} className="py-24 px-6 bg-bg-surface/30">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading mb-12"
        >
          <span className="text-terminal-green">$</span> cat skills.txt
        </motion.div>

        {/* Skills grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div key={category} variants={item} className="terminal-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-terminal-green font-mono text-xs">►</span>
                <span className="font-mono text-xs text-terminal-muted uppercase tracking-widest">
                  {CATEGORY_LABELS[category] || category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(items as string[]).map((skill) => (
                  <span
                    key={skill}
                    className={`font-mono text-xs px-2 py-0.5 rounded border ${SKILL_CATEGORY_COLORS[category] || "border-bg-border text-terminal-muted"}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
