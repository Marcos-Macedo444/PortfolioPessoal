"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Copy, Github, Linkedin, LoaderCircle, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { contactLinks, profile } from "@/data/profile";
import { copyText } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

type ContactErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const MIN_MESSAGE_LENGTH = 12;
const SEND_COOLDOWN_MS = 15_000;
const fallbackError =
  "Não foi possível enviar sua mensagem agora. Tente novamente em alguns minutos ou me chame pelo LinkedIn/GitHub.";

function readFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validateContactForm(formData: FormData) {
  const name = readFormValue(formData, "name");
  const email = readFormValue(formData, "email");
  const message = readFormValue(formData, "message");
  const errors: ContactErrors = {};

  if (!name) {
    errors.name = "Informe seu nome.";
  }

  if (!email) {
    errors.email = "Informe seu e-mail.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!message) {
    errors.message = "Escreva uma mensagem.";
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `A mensagem precisa ter pelo menos ${MIN_MESSAGE_LENGTH} caracteres.`;
  }

  return { errors, hasErrors: Object.keys(errors).length > 0 };
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [lastSentAt, setLastSentAt] = useState(0);

  const isSubmitting = status === "submitting";

  const onCopyEmail = async () => {
    await copyText(profile.email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1700);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const validation = validateContactForm(formData);

    setErrors(validation.errors);

    if (validation.hasErrors) {
      setStatus("error");
      setFeedback("Confira os campos destacados antes de enviar.");
      return;
    }

    if (Date.now() - lastSentAt <= SEND_COOLDOWN_MS) {
      setStatus("error");
      setFeedback("Aguarde alguns segundos antes de enviar outra mensagem.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    const payload = {
      name: readFormValue(formData, "name"),
      email: readFormValue(formData, "email"),
      subject: readFormValue(formData, "subject"),
      message: readFormValue(formData, "message"),
      company: readFormValue(formData, "company")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json().catch(() => null)) as
        | { message?: string; errors?: ContactErrors }
        | null;

      if (!response.ok) {
        setStatus("error");
        setErrors(result?.errors ?? {});
        setFeedback(result?.message ?? fallbackError);
        return;
      }

      form.reset();
      setErrors({});
      setStatus("success");
      setFeedback(result?.message ?? "Mensagem enviada com sucesso. Obrigado pelo contato!");
      setLastSentAt(Date.now());
      window.setTimeout(() => {
        setStatus("idle");
        setFeedback("");
      }, 6000);
    } catch {
      setStatus("error");
      setFeedback(fallbackError);
    }
  };

  return (
    <section id="contato" className="relative py-24">
      <div className="container-shell">
        <SectionTitle
          eyebrow="contact handshake"
          title="Contato e networking"
          description="Canais diretos para GitHub, LinkedIn e e-mail, com formulário seguro para mensagens profissionais."
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
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
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
            noValidate
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-matrix-muted">
                Nome
                <input
                  name="name"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className="min-h-12 rounded-md border border-white/10 bg-matrix-black/45 px-4 text-matrix-text outline-none transition focus:border-matrix-green"
                  placeholder="Seu nome"
                />
                {errors.name ? (
                  <span id="contact-name-error" className="text-xs text-red-300">
                    {errors.name}
                  </span>
                ) : null}
              </label>
              <label className="grid gap-2 text-sm text-matrix-muted">
                E-mail
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className="min-h-12 rounded-md border border-white/10 bg-matrix-black/45 px-4 text-matrix-text outline-none transition focus:border-matrix-green"
                  placeholder="voce@email.com"
                />
                {errors.email ? (
                  <span id="contact-email-error" className="text-xs text-red-300">
                    {errors.email}
                  </span>
                ) : null}
              </label>
            </div>

            <label className="mt-5 grid gap-2 text-sm text-matrix-muted">
              Assunto
              <input
                name="subject"
                autoComplete="off"
                className="min-h-12 rounded-md border border-white/10 bg-matrix-black/45 px-4 text-matrix-text outline-none transition focus:border-matrix-green"
                placeholder="Projeto, oportunidade ou networking"
              />
            </label>

            <label className="mt-5 grid gap-2 text-sm text-matrix-muted">
              Mensagem
              <textarea
                name="message"
                rows={6}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className="resize-y rounded-md border border-white/10 bg-matrix-black/45 px-4 py-3 text-matrix-text outline-none transition focus:border-matrix-green"
                placeholder="Escreva sua mensagem..."
              />
              {errors.message ? (
                <span id="contact-message-error" className="text-xs text-red-300">
                  {errors.message}
                </span>
              ) : null}
            </label>

            <label className="sr-only" aria-hidden="true">
              Empresa
              <input name="company" tabIndex={-1} autoComplete="off" />
            </label>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                icon={
                  isSubmitting ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden />
                  )
                }
              >
                {isSubmitting ? "Enviando..." : "Enviar mensagem"}
              </Button>
              {feedback ? (
                <p
                  className={`inline-flex items-center gap-2 text-sm ${
                    status === "success" ? "text-matrix-green" : "text-red-300"
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {status === "success" ? (
                    <CheckCircle2 className="h-4 w-4" aria-hidden />
                  ) : (
                    <AlertCircle className="h-4 w-4" aria-hidden />
                  )}
                  {feedback}
                </p>
              ) : null}
            </div>

            <p className="mt-4 flex items-center gap-2 font-mono text-xs text-matrix-muted">
              <Mail className="h-3.5 w-3.5 text-matrix-cyan" aria-hidden />
              Envio protegido por validação server-side e variáveis de ambiente.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
