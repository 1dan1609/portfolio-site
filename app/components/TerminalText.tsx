"use client";

import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

interface TerminalTextProps {
  sequences: (string | number)[];
  className?: string;
  cursor?: boolean;
  speed?: number;
  onComplete?: () => void;
}

export default function TerminalText({
  sequences,
  className = "",
  cursor = true,
  speed = 50,
  onComplete,
}: TerminalTextProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`font-mono ${className}`}
    >
      <TypeAnimation
        sequence={[...sequences, ...(onComplete ? [onComplete] : [])]}
        wrapper="span"
        speed={speed as 1 | 2 | 3 | 40 | 45 | 50 | 55 | 60 | 65 | 70 | 75 | 80 | 85 | 90 | 95 | 99}
        cursor={cursor}
        style={{ display: "inline-block" }}
      />
    </motion.span>
  );
}
