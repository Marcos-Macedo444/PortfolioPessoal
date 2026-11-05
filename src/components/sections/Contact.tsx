"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, LoaderCircle, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { copyText } from "@/lib/utils";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
const fallbackError =
  "Não foi possível enviar agora. Tente novamente em alguns minutos ou entre em contato pelo LinkedIn ou e-mail.";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const lastSentAt = useRef(0);
  const copyTimeout = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copyTimeout.current), []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) || "").trim();
    const payload = {
      name: read("name"),
      email: read("email"),
      subject: read("subject"),
      message: read("message"),
      company: read("company"),
    };
    const nextErrors: Errors = {};
    if (!payload.name) nextErrors.name = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      nextErrors.email = "Informe um e-mail válido.";
    if (payload.message.length < 12)
      nextErrors.message = "Escreva uma mensagem com pelo menos 12 caracteres.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("error");
      setFeedback("Confira os campos destacados antes de enviar.");
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)
        ?.focus();
      return;
    }
    if (Date.now() - lastSentAt.current < 15_000) {
      setFeedback("Aguarde alguns segundos antes de enviar outra mensagem.");
      return;
    }
    setStatus("submitting");
    setFeedback("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setStatus("error");
        setErrors(result.errors || {});
        setFeedback(result.message || fallbackError);
        return;
      }
      form.reset();
      setStatus("success");
      setFeedback(
        result.message ||
          "Mensagem enviada com sucesso. Obrigado pelo contato!",
      );
      lastSentAt.current = Date.now();
    } catch {
      setStatus("error");
      setFeedback(fallbackError);
    }
  };

  return (
    <section id="contato" className="section contact-section">
      <div className="container-shell">
        <div className="contact-grid">
          <div className="contact-copy">
            <p className="eyebrow">06 / Próxima conexão</p>
            <h2>
              Uma boa conversa
              <br />é um bom começo<span className="accent">.</span>
            </h2>
            <p>
              Sobre redes, tecnologia ou uma ideia que merece sair do papel.
              Vamos conectar os pontos.
            </p>
            <a href={`mailto:${profile.email}`} className="contact-email">
              {profile.email}
              <ArrowUpRight size={17} />
            </a>
            <button
              className="text-link"
              type="button"
              onClick={async () => {
                await copyText(profile.email);
                setCopied(true);
                clearTimeout(copyTimeout.current);
                copyTimeout.current = setTimeout(() => setCopied(false), 2000);
              }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "E-mail copiado" : "Copiar e-mail"}
            </button>
            <div className="contact-socials">
              <a
                className="text-link"
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <ArrowUpRight size={15} />
              </a>
              <a
                className="text-link"
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <form
            onSubmit={onSubmit}
            noValidate
            className="contact-form"
            aria-label="Formulário de contato"
          >
            <div className="form-row">
              <label>
                Nome
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Como posso chamar você?"
                  maxLength={120}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                />
                {errors.name && (
                  <span id="contact-name-error" className="field-error">
                    {errors.name}
                  </span>
                )}
              </label>
              <label>
                E-mail
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  maxLength={120}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                />
                {errors.email && (
                  <span id="contact-email-error" className="field-error">
                    {errors.email}
                  </span>
                )}
              </label>
            </div>
            <label>
              Assunto <span className="optional">(opcional)</span>
              <input
                name="subject"
                placeholder="Sobre o que vamos conversar?"
                maxLength={120}
              />
            </label>
            <label>
              Mensagem
              <textarea
                name="message"
                rows={5}
                placeholder="Conte um pouco da sua ideia…"
                maxLength={3000}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
              />
              {errors.message && (
                <span id="contact-message-error" className="field-error">
                  {errors.message}
                </span>
              )}
            </label>
            <label className="sr-only" aria-hidden="true">
              Empresa
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>
            <div className="form-action">
              <button
                className="button"
                type="submit"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Enviando…" : "Enviar mensagem"}
                {status === "submitting" ? (
                  <LoaderCircle size={16} className="sending-icon" />
                ) : (
                  <Send size={16} />
                )}
              </button>
              <p className="form-note">
                Sua mensagem chega direto
                <br />
                ao meu e-mail.
              </p>
            </div>
            <p
              className={`form-feedback ${status === "error" ? "error" : ""}`}
              role="status"
              aria-live="polite"
            >
              {feedback}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
