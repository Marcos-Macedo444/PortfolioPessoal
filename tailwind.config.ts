import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        matrix: {
          black: "#020605",
          graphite: "#0b1214",
          panel: "#0e1719",
          line: "#173337",
          green: "#2dff8f",
          cyan: "#20e6ff",
          blue: "#5a7cff",
          purple: "#9d6bff",
          text: "#e6fff4",
          muted: "#94a9aa"
        }
      },
      boxShadow: {
        panel: "0 18px 48px rgba(0, 0, 0, 0.18)",
        glow: "0 0 20px rgba(45, 255, 143, 0.1)",
        cyan: "0 0 24px rgba(32, 230, 255, 0.1)",
        purple: "0 0 24px rgba(157, 107, 255, 0.09)"
      },
      backgroundImage: {
        "cyber-radial": "linear-gradient(135deg, rgba(45, 255, 143, 0.16) 0%, transparent 28%), linear-gradient(225deg, rgba(32, 230, 255, 0.12) 0%, transparent 30%), linear-gradient(180deg, rgba(2, 6, 5, 0.2) 0%, rgba(12, 20, 24, 0.55) 50%, rgba(2, 6, 5, 0.2) 100%)",
        "scan-line": "linear-gradient(90deg, transparent, rgba(45, 255, 143, 0.34), transparent)"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "SFMono-Regular", "monospace"]
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        scan: {
          "0%": { transform: "translateX(-110%)" },
          "100%": { transform: "translateX(110%)" }
        },
        gridFlow: {
          "0%": { backgroundPosition: "0 0, 0 0" },
          "100%": { backgroundPosition: "0 96px, 96px 0" }
        },
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        signalTrace: {
          "0%": { strokeDashoffset: "320", opacity: "0.2" },
          "45%": { opacity: "0.85" },
          "100%": { strokeDashoffset: "0", opacity: "0.2" }
        },
        nodePulse: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.35)" }
        },
        energyBreath: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.05)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" }
        },
        floatPanel: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      },
      animation: {
        ticker: "ticker 28s linear infinite",
        "ticker-slow": "ticker 42s linear infinite",
        scan: "scan 4.8s ease-in-out infinite",
        "grid-flow": "gridFlow 18s linear infinite",
        "radar-sweep": "radarSweep 14s linear infinite",
        "signal-trace": "signalTrace 7s ease-in-out infinite",
        "node-pulse": "nodePulse 4.4s ease-in-out infinite",
        "energy-breath": "energyBreath 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.8s ease-in-out infinite",
        "float-panel": "floatPanel 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
