"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Link2, Terminal } from "lucide-react";
import portfolioData from "@/content/portfolio-data.json";

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { personal } = portfolioData;

  return (
    <footer
      id="contact"
      ref={ref}
      className="py-20 px-6 border-t border-bg-border bg-bg-surface/20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Terminal prompt */}
          <div className="font-mono text-xs text-terminal-muted mb-8 flex items-center justify-center gap-2">
            <span className="text-terminal-green">$</span>
            <span>./contact.sh --open-to-work</span>
            <span className="cursor-blink" />
          </div>

          <h2 className="text-3xl font-bold text-terminal-white mb-3">
            Let&apos;s Build Something
          </h2>
          <p className="text-terminal-muted text-sm max-w-md mx-auto mb-10">
            Open to new opportunities in Software Engineering and Development.
            Reach out via email or connect on LinkedIn.
          </p>

          {/* Contact links */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              id="footer-email"
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2 font-mono text-sm px-5 py-2.5 rounded border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-bg-base transition-all duration-200 shadow-glow-green"
            >
              <Mail size={15} />
              {personal.email}
            </a>
            <a
              id="footer-linkedin"
              href={`https://${personal.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-sm px-5 py-2.5 rounded border border-terminal-blue text-terminal-blue hover:bg-terminal-blue hover:text-bg-base transition-all duration-200"
            >
              <Link2 size={15} />
              LinkedIn
            </a>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-bg-border flex items-center justify-center gap-2 text-terminal-subtle font-mono text-xs">
            <Terminal size={12} />
            <span>vandan.dev</span>
            <span className="mx-2">·</span>
            <span>Built with Next.js 14 + Gemini AI</span>
            <span className="mx-2">·</span>
            <span>{new Date().getFullYear()}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
