"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";

const CATEGORY_LABELS: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks & Libraries",
  tools: "Dev Tools",
  specialized: "Security & Specialized",
  os: "Operating Systems",
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { skills } = portfolioData;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="skills" className="py-16 px-6 md:pl-28">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading mb-8"
        >
          Stack
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-4"
        >
          {Object.entries(skills).map(([category, items]) => (
            <motion.div key={category} variants={item} className="forge-panel rounded-sm p-5">
              <div className="font-sans text-[11px] text-accent-orange uppercase tracking-widest mb-3">
                {CATEGORY_LABELS[category] || category}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
                {(items as string[]).map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 font-mono text-xs text-ink-body"
                  >
                    <Check size={11} className="text-accent-orange flex-shrink-0" />
                    <span className="truncate">{skill}</span>
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
