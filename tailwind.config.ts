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
        glow: "0 0 28px rgba(45, 255, 143, 0.18)",
        cyan: "0 0 34px rgba(32, 230, 255, 0.16)",
        purple: "0 0 34px rgba(157, 107, 255, 0.14)"
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
        scan: "scan 3.2s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.8s ease-in-out infinite",
        "float-panel": "floatPanel 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
