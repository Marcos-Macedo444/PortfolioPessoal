"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Monitor, Moon, Pause, Play, Sun } from "lucide-react";
import { createPortal } from "react-dom";

type Theme = "system" | "dark" | "light";
const PreferencesContext = createContext({ motion: true });

export function Preferences({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [controlsTarget, setControlsTarget] = useState<HTMLElement | null>(
    null,
  );

  useEffect(() => {
    setControlsTarget(document.getElementById("display-controls"));
    try {
      const saved = localStorage.getItem("mm-theme");
      if (saved === "light" || saved === "dark") setTheme(saved);
      setPaused(localStorage.getItem("mm-motion") === "paused");
    } catch {
      /* Preferences still work when storage is unavailable. */
    }
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    setInitialized(true);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const motion = !paused && !reduced;
  useEffect(() => {
    if (!initialized) return;
    document.documentElement.dataset.motion = motion ? "on" : "off";
  }, [motion, initialized]);

  const changeTheme = (value: Theme) => {
    setTheme(value);
    try {
      localStorage.setItem("mm-theme", value);
    } catch {
      /* Session-only preference. */
    }
    document.documentElement.dataset.theme = value;
  };

  return (
    <PreferencesContext.Provider value={{ motion }}>
      {children}
      {controlsTarget
        ? createPortal(
            <div className="preferences" aria-label="Preferências de exibição">
              <label className="theme-control" title="Tema de aparência">
                {theme === "dark" ? (
                  <Moon size={16} />
                ) : theme === "light" ? (
                  <Sun size={16} />
                ) : (
                  <Monitor size={16} />
                )}
                <span className="sr-only">Tema de aparência</span>
                <select
                  aria-label="Tema de aparência"
                  value={theme}
                  onChange={(event) => changeTheme(event.target.value as Theme)}
                >
                  <option value="system">Sistema</option>
                  <option value="dark">Escuro</option>
                  <option value="light">Claro</option>
                </select>
              </label>
              <button
                type="button"
                className="icon-button"
                aria-label={paused ? "Ativar animações" : "Pausar animações"}
                title={paused ? "Ativar animações" : "Pausar animações"}
                aria-pressed={paused}
                onClick={() => {
                  const next = !paused;
                  setPaused(next);
                  try {
                    localStorage.setItem("mm-motion", next ? "paused" : "on");
                  } catch {
                    /* Session-only preference. */
                  }
                }}
              >
                {paused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>,
            controlsTarget,
          )
        : null}
    </PreferencesContext.Provider>
  );
}

export const useMotionPreference = () => useContext(PreferencesContext).motion;
