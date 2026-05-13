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
    <section id="education" ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading mb-12"
        >
          <span className="text-terminal-green">$</span> cat education.log
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 gap-6"
        >
          {education.map((edu) => (
            <motion.div key={edu.id} variants={item} className="terminal-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded border border-terminal-green/30 bg-terminal-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GraduationCap size={16} className="text-terminal-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-terminal-white">{edu.school}</div>
                  <div className="text-terminal-muted text-sm mt-1">{edu.degree}</div>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <span className="font-mono text-xs text-terminal-green border border-terminal-green/30 px-2 py-0.5 rounded">
                      {edu.dates}
                    </span>
                    <span className="font-mono text-xs text-terminal-muted">
                      GPA: {edu.gpa}
                    </span>
                    <span className="font-mono text-xs text-terminal-subtle">
                      {edu.location}
                    </span>
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
