"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { copyText, scrollToSection } from "@/lib/utils";
import { useCommandPalette } from "@/hooks/useCommandPalette";

export function CommandPalette() {
  const { open, openPalette, closePalette } = useCommandPalette();
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    if (open) element?.showModal();
    else element?.close();
  }, [open]);
  const close = () => {
    closePalette();
    setQuery("");
  };
  const commands = [
    ...navigationItems.map((item) => ({
      label: `Ir para ${item.label}`,
      action: () => scrollToSection(item.id),
    })),
    {
      label: "Abrir GitHub",
      action: () => {
        window.open(profile.githubUrl, "_blank", "noopener,noreferrer");
      },
    },
    {
      label: "Abrir LinkedIn",
      action: () => {
        window.open(profile.linkedinUrl, "_blank", "noopener,noreferrer");
      },
    },
    {
      label: "Copiar e-mail",
      action: async () => {
        await copyText(profile.email);
        setCopied(true);
      },
    },
  ].filter((item) =>
    item.label
      .toLocaleLowerCase("pt-BR")
      .includes(query.toLocaleLowerCase("pt-BR")),
  );
  return (
    <>
      <button
        className="palette-trigger icon-button"
        type="button"
        aria-label="Buscar no portfólio"
        title="Buscar no portfólio"
        onClick={openPalette}
      >
        <Search size={17} />
      </button>
      <dialog
        ref={dialog}
        className="command-dialog"
        aria-labelledby="command-title"
        onCancel={close}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="command-heading">
          <Search size={18} />
          <h2 id="command-title" className="sr-only">
            Buscar no portfólio
          </h2>
          <input
            aria-label="Buscar seção ou contato"
            placeholder="Buscar seção ou contato"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus
          />
          <button
            className="icon-button"
            type="button"
            onClick={close}
            aria-label="Fechar busca"
          >
            <X size={18} />
          </button>
        </div>
        <div className="command-results">
          {commands.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                void item.action();
                close();
              }}
            >
              {item.label}
              <ArrowUpRight size={15} />
            </button>
          ))}
          {commands.length === 0 && <p>Nenhum resultado encontrado.</p>}
        </div>
      </dialog>
      <span className="sr-only" role="status">
        {copied ? "E-mail copiado" : ""}
      </span>
    </>
  );
}
