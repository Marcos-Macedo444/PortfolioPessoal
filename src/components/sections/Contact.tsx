"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Github, Linkedin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { contactLinks, profile } from "@/data/profile";
import { copyText } from "@/lib/utils";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const onCopyEmail = async () => {
    await copyText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1700);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    window.setTimeout(() => setSent(false), 2400);
  };

  return (
    <section id="contato" className="relative py-24">
      <div className="container-shell">
        <SectionTitle
          eyebrow="contact handshake"
          title="Contato e networking"
          description="Canais preparados para GitHub, LinkedIn, e-mail e um formulário visual pronto para receber backend no futuro."
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === "E-mail" ? undefined : "_blank"}
                  rel={link.label === "E-mail" ? undefined : "noreferrer"}
                  className="block rounded-lg border border-white/10 bg-white/[0.03] p-4 transition hover:border-matrix-green/45"
                >
                  <p className="font-mono text-xs uppercase text-matrix-green">{link.label}</p>
                  <p className="mt-2 break-words text-matrix-text">{link.value}</p>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={onCopyEmail}
                variant="secondary"
                icon={<Copy className="h-4 w-4" aria-hidden />}
              >
                {copied ? "E-mail copiado" : "Copiar e-mail"}
              </Button>
              <Button
                href={profile.githubUrl}
                external
                variant="ghost"
                icon={<Github className="h-4 w-4" aria-hidden />}
              >
                Abrir GitHub
              </Button>
              <Button
                href={profile.linkedinUrl}
                external
                variant="ghost"
                icon={<Linkedin className="h-4 w-4" aria-hidden />}
              >
                Abrir LinkedIn
              </Button>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            className="cyber-panel rounded-lg p-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-matrix-muted">
                Nome
                <input
                  name="name"
                  className="min-h-12 rounded-md border border-white/10 bg-matrix-black/45 px-4 text-matrix-text outline-none transition focus:border-matrix-green"
                  placeholder="Seu nome"
                />
              </label>
              <label className="grid gap-2 text-sm text-matrix-muted">
                E-mail
                <input
                  name="email"
                  type="email"
                  className="min-h-12 rounded-md border border-white/10 bg-matrix-black/45 px-4 text-matrix-text outline-none transition focus:border-matrix-green"
                  placeholder="voce@email.com"
                />
              </label>
            </div>
            <label className="mt-5 grid gap-2 text-sm text-matrix-muted">
              Assunto
              <input
                name="subject"
                className="min-h-12 rounded-md border border-white/10 bg-matrix-black/45 px-4 text-matrix-text outline-none transition focus:border-matrix-green"
                placeholder="Projeto, oportunidade ou networking"
              />
            </label>
            <label className="mt-5 grid gap-2 text-sm text-matrix-muted">
              Mensagem
              <textarea
                name="message"
                rows={6}
                className="resize-y rounded-md border border-white/10 bg-matrix-black/45 px-4 py-3 text-matrix-text outline-none transition focus:border-matrix-green"
                placeholder="Escreva sua mensagem..."
              />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button type="submit" icon={<Send className="h-4 w-4" aria-hidden />}>
                Enviar mensagem visual
              </Button>
              {sent ? (
                <p className="inline-flex items-center gap-2 text-sm text-matrix-green" role="status">
                  <Mail className="h-4 w-4" aria-hidden />
                  Mensagem preparada localmente.
                </p>
              ) : null}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
