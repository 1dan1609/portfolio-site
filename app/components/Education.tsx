"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";

export default function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { education } = portfolioData;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="education" className="py-16 px-6 md:pl-28">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading"
        >
          Training Record
        </motion.div>
        <div className="font-mono text-[10px] text-ink-subtle tracking-wide mt-1 mb-8">
          Education
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-4"
        >
          {education.map((edu) => (
            <motion.div key={edu.id} variants={item} className="forge-panel rounded-sm p-5">
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="text-accent-orange flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <div className="flex-1 min-w-0">
                  <div className="font-sans font-bold text-sm text-ink-display uppercase tracking-wide">
                    {edu.school}
                  </div>
                  <div className="font-sans text-xs text-ink-muted mt-1">{edu.degree}</div>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <span className="font-mono text-[11px] text-accent-orange border border-accent-orange/30 px-2 py-0.5 rounded-sm">
                      {edu.dates}
                    </span>
                    {"gpa" in edu && (
                      <span className="font-mono text-[11px] text-ink-subtle">GPA {edu.gpa}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
