"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useScroll } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Gauge,
  Network,
  Radio,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { connections } from "@/data/connections";
import { profile } from "@/data/profile";
import { useMotionPreference } from "@/components/ui/Preferences";
import { OpeningSequence } from "@/components/ui/OpeningSequence";
import { HyperspeedScene } from "@/components/visuals/HyperspeedScene";

const icons = [Network, Radio, ShieldCheck, Workflow];

export function Hero() {
  const [selected, setSelected] = useState(0);
  const [boosting, setBoosting] = useState(false);
  const [sceneStatus, setSceneStatus] = useState<
    "preparing" | "ready" | "fallback"
  >("preparing");
  const ref = useRef<HTMLElement>(null);
  const activity = useRef(1);
  const boostTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const motion = useMotionPreference();
  const area = connections[selected];
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const onStatus = useCallback(
    (status: typeof sceneStatus) => setSceneStatus(status),
    [],
  );
  const stopBoost = useCallback(() => {
    if (boostTimer.current) clearTimeout(boostTimer.current);
    setBoosting(false);
  }, []);
  const startBoost = () => {
    if (!motion || sceneStatus !== "ready") return;
    stopBoost();
    setBoosting(true);
    boostTimer.current = setTimeout(stopBoost, 1400);
  };

  useEffect(
    () =>
      scrollYProgress.on("change", (value) => {
        activity.current = Math.max(0.12, 1 - value * 0.95);
      }),
    [scrollYProgress],
  );
  useEffect(() => {
    const release = () => stopBoost();
    window.addEventListener("blur", release);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    document.addEventListener("visibilitychange", release);
    return () => {
      window.removeEventListener("blur", release);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      document.removeEventListener("visibilitychange", release);
      if (boostTimer.current) clearTimeout(boostTimer.current);
    };
  }, [stopBoost]);
  useEffect(() => {
    if (!motion || sceneStatus !== "ready") stopBoost();
  }, [motion, sceneStatus, stopBoost]);

  return (
    <section id="inicio" className="hero" ref={ref}>
      <OpeningSequence ready={sceneStatus !== "preparing"} />
      <HyperspeedScene
        selected={selected}
        boosting={boosting}
        activity={activity}
        onStatus={onStatus}
      />
      <div className="container-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Redes, infraestrutura & pessoas
          </p>
          <h1 tabIndex={-1}>
            Marcos
            <br />
            <span>
              Macêdo<span className="name-period">.</span>
            </span>
          </h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-description">{profile.headline}</p>
          <div className="hero-actions">
            <a className="button" href="#projetos">
              Explorar projetos <ArrowUpRight size={18} />
            </a>
            <a className="text-link" href="#jornada">
              Minha trajetória <ArrowDown size={17} />
            </a>
          </div>
        </div>
        <button
          className="boost-control"
          type="button"
          title="Acelerar enquanto pressiona"
          aria-pressed={boosting}
          disabled={!motion || sceneStatus !== "ready"}
          onPointerDown={startBoost}
          onPointerUp={stopBoost}
          onPointerCancel={stopBoost}
          onPointerLeave={stopBoost}
          onBlur={stopBoost}
          onKeyDown={(event) => {
            if (event.key === " " || event.key === "Enter") {
              event.preventDefault();
              if (!event.repeat) startBoost();
            }
          }}
          onKeyUp={(event) => {
            if (event.key === " " || event.key === "Enter") {
              event.preventDefault();
              stopBoost();
            }
          }}
          onClick={(event) => {
            if (event.detail === 0) startBoost();
          }}
        >
          <Gauge size={18} aria-hidden="true" /> Acelerar
        </button>
      </div>
      <div className="container-shell hero-connections" data-connection-origin>
        <div className="network-heading">
          <span>Conexões em movimento</span>
          <span className="network-index">01 — 04</span>
        </div>
        <div className="hero-network">
          <div className="area-tabs" role="group" aria-label="Áreas de atuação">
            {connections.map((item, index) => {
              const Icon = icons[index];
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`area-tab ${selected === index ? "selected" : ""}`}
                  aria-pressed={selected === index}
                  aria-controls="area-description"
                  onClick={() => setSelected(index)}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div
            className="network-context"
            id="area-description"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="connection-label">
              <span className="status-dot" />
              {area.label}
              <span className="connection-rule" />
            </p>
            <h2>{area.subtitle}</h2>
            <p>{area.description}</p>
            {area.projects.length > 0 && (
              <a className="text-link" href="#project-finance-system">
                Conhecer a automação financeira <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="container-shell hero-foot">
        <div className="current-position">
          <Image
            src="/images/profile/profile.png"
            alt="Marcos Macêdo"
            width={44}
            height={44}
            sizes="44px"
            className="mini-portrait"
          />
          <div>
            <span>Atualmente na</span>
            <p>
              {profile.company} <ArrowUpRight size={13} />
            </p>
          </div>
        </div>
        <p className="hero-location">
          Vitória / Espírito Santo
          <br />
          <span>Brasil</span>
        </p>
        <a
          href="#jornada"
          className="scroll-cue"
          aria-label="Explorar minha trajetória"
        >
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
