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
        // Terminal dark palette
        bg: {
          base: "#0D1117",
          surface: "#161B22",
          elevated: "#1C2128",
          border: "#30363D",
        },
        terminal: {
          green: "#00FF41",
          "green-dim": "#39D353",
          "green-muted": "#26A641",
          blue: "#58A6FF",
          "blue-dim": "#388BFD",
          yellow: "#F0C040",
          red: "#F85149",
          purple: "#BC8CFF",
          cyan: "#79C0FF",
          orange: "#FFA657",
          white: "#E6EDF3",
          muted: "#8B949E",
          subtle: "#484F58",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "blink": "blink 1s step-end infinite",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "scan-line": "scanLine 8s linear infinite",
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
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 255, 65, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 255, 65, 0.6)" },
        },
        scanLine: {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(100vh)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(0,255,65,0.05) 0%, transparent 70%)",
      },
      backgroundSize: {
        "grid-sm": "40px 40px",
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(0, 255, 65, 0.3), 0 0 40px rgba(0, 255, 65, 0.1)",
        "glow-blue": "0 0 20px rgba(88, 166, 255, 0.3)",
        "terminal": "0 0 0 1px rgba(0, 255, 65, 0.2), inset 0 0 30px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
