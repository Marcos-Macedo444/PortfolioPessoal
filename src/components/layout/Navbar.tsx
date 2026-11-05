"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Monogram } from "@/components/ui/Monogram";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    menu.current
      ?.querySelector<HTMLElement>("a")
      ?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const ids = useMemo(() => navigationItems.map((item) => item.id), []);
  const active = useScrollSpy(ids);
  return (
    <header className="site-header">
      <nav
        className="container-shell nav-shell"
        aria-label="Navegação principal"
      >
        <a href="#inicio" className="brand" aria-label="Marcos Macêdo, início">
          <Monogram />
          <span>
            Marcos Macêdo<span className="brand-dot">.</span>
          </span>
        </a>
        <div
          ref={menu}
          className={`nav-links ${open ? "is-open" : ""}`}
          id="main-navigation"
        >
          {navigationItems
            .filter((item) => item.id !== "inicio")
            .map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
          <button
            className="nav-search"
            type="button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new Event("open-command-palette"));
            }}
          >
            <Command size={16} />
            Buscar no portfólio
          </button>
        </div>
        <div className="nav-tools">
          <div id="display-controls" />
          <button
            type="button"
            className="icon-button search-trigger"
            title="Buscar no portfólio"
            aria-label="Buscar no portfólio"
            onClick={() =>
              window.dispatchEvent(new Event("open-command-palette"))
            }
          >
            <Command size={17} />
          </button>
          <a href="#contato" className="nav-contact">
            Vamos conversar <ArrowUpRight size={16} />
          </a>
          <button
            type="button"
            className="icon-button menu-toggle"
            ref={toggle}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
