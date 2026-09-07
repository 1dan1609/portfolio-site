import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // The Forge, reforged as a build/deploy engineering dashboard.
        board: {
          black: "#0B0B0D",
          panel: "#1A1917",
          line: "#2A2D31",
        },
        accent: {
          orange: "#FF5A11",
          heat: "#FFF3C4",
          cherry: "#C21E0E",
        },
        ink: {
          display: "#FFFDF7",
          body: "#EDE9E2",
          muted: "#b2a99f",
          subtle: "#9f988f",
        },
      },
      fontFamily: {
        display: ["var(--font-stencil)", "Impact", "sans-serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "Fira Code", "monospace"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-live": "pulseLive 1.6s ease-in-out infinite",
        "fill-bar": "fillBar 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseLive: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        fillBar: {
          from: { width: "0%" },
          to: { width: "var(--fill-to, 100%)" },
        },
      },
      backgroundImage: {
        "heat-gradient":
          "linear-gradient(90deg, #C21E0E 0%, #FF5A11 55%, #FFF3C4 100%)",
        "grain":
          "repeating-linear-gradient(115deg, rgba(255,255,255,0.014) 0px, rgba(255,255,255,0.014) 1px, transparent 1px, transparent 3px)",
      },
      boxShadow: {
        "panel": "0 1px 0 rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.02)",
        "orange-glow": "0 0 0 1px rgba(255,90,17,0.4), 0 8px 24px -8px rgba(255,90,17,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
