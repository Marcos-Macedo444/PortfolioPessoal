"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Network,
  Radio,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { connections } from "@/data/connections";
import { profile } from "@/data/profile";
import { useMotionPreference } from "@/components/ui/Preferences";

const icons = [Network, Radio, ShieldCheck, Workflow];
const paths = [
  "M300 215H238L182 90H105",
  "M300 215H362L418 90H495",
  "M300 215H238L182 340H105",
  "M300 215H362L418 340H495",
];

export function Hero() {
  const [selected, setSelected] = useState(0);
  const [tabVisible, setTabVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const motionEnabled = useMotionPreference();
  const area = connections[selected];

  useEffect(() => {
    const update = () => setTabVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return (
    <section id="inicio" className="hero">
      <div className="container-shell hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Redes, infraestrutura & pessoas
          </p>
          <h1>
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

        <div className="hero-network" ref={ref}>
          <div className="network-heading">
            <span>Conexões em movimento</span>
            <span className="network-index">01 — 04</span>
          </div>
          <div
            className="network-map"
            data-running={motionEnabled && inView && tabVisible}
          >
            <svg
              viewBox="0 0 600 430"
              aria-hidden="true"
              className="network-svg"
            >
              <path
                className="network-grid"
                d="M0 90H600M0 215H600M0 340H600M105 0V430M300 0V430M495 0V430"
              />
              <circle className="network-orbit" cx="300" cy="215" r="142" />
              <circle
                className="network-orbit inner"
                cx="300"
                cy="215"
                r="104"
              />
              {paths.map((d, index) => (
                <motion.path
                  key={d}
                  d={d}
                  className={`network-route ${selected === index ? "selected" : ""}`}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: motionEnabled ? 0.9 : 0,
                    delay: motionEnabled ? index * 0.04 : 0,
                  }}
                />
              ))}
              <path className="network-tail" d="M300 265V430" />
              <path
                className="network-core"
                d="M246 242V188L273 219L300 188V242M310 242V188L337 219L364 188V242"
              />
              <circle cx="246" cy="242" r="4" className="signal-dot" />
              <circle cx="364" cy="188" r="4" className="signal-dot" />
              <circle
                key={selected}
                r="4"
                className="route-signal"
                style={{ offsetPath: `path('${paths[selected]}')` }}
              />
            </svg>
            <div
              className="network-nodes"
              role="group"
              aria-label="Áreas de atuação"
            >
              {connections.map((item, index) => {
                const Icon = icons[index];
                return (
                  <button
                    type="button"
                    key={item.id}
                    className={`network-node node-${index} ${selected === index ? "selected" : ""}`}
                    aria-pressed={selected === index}
                    aria-controls="area-description"
                    onClick={() => setSelected(index)}
                  >
                    <span className="node-symbol">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <span className="map-coordinate">MM / VITÓRIA, ES</span>
          </div>
          <div
            className="network-context"
            id="area-description"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="connection-label">
              <span className="status-dot" /> {area.label}{" "}
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
