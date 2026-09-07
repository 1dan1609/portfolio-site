"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Mail, Link2, GitFork } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { personal } = portfolioData;

  return (
    <section id="about" ref={ref} className="py-16 px-6 md:pl-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-heading mb-8"
        >
          Profile
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="forge-panel rounded-sm p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div className="flex-shrink-0 w-full sm:w-auto">
              <div className="relative w-full h-56 sm:w-48 sm:h-auto sm:aspect-[3/4] rounded-sm border border-accent-orange/30 bg-board-black overflow-hidden">
                <Image
                  src={personal.photo}
                  alt={personal.name}
                  fill
                  sizes="(min-width: 640px) 192px, 100vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-sans font-bold text-lg text-ink-display uppercase tracking-wide mb-3">
                {personal.name}
              </h2>
              <p className="font-sans text-sm text-ink-body/85 leading-relaxed">
                {personal.bio}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-sm border border-board-line text-ink-muted hover:text-accent-orange hover:border-accent-orange/40 transition-colors"
                >
                  <Mail size={12} />
                  {personal.email}
                </a>
                <a
                  href={`https://${personal.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-sm border border-board-line text-ink-muted hover:text-accent-orange hover:border-accent-orange/40 transition-colors"
                >
                  <Link2 size={12} />
                  LinkedIn
                </a>
                <a
                  href={`https://${personal.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-sm border border-board-line text-ink-muted hover:text-accent-orange hover:border-accent-orange/40 transition-colors"
                >
                  <GitFork size={12} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
