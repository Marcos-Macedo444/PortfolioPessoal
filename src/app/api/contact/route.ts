import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_TO_EMAIL = "marcosfilipe.macedo@gmail.com";
const MIN_MESSAGE_LENGTH = 12;
const MAX_FIELD_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 3000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, number>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
};

type ValidationResult = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company: string;
  errors: Record<string, string>;
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function clamp(value: string, maxLength: number) {
  return value.slice(0, maxLength);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validatePayload(payload: ContactPayload): ValidationResult {
  const name = clamp(readString(payload.name), MAX_FIELD_LENGTH);
  const email = clamp(readString(payload.email), MAX_FIELD_LENGTH);
  const subject = clamp(readString(payload.subject), MAX_FIELD_LENGTH);
  const message = clamp(readString(payload.message), MAX_MESSAGE_LENGTH);
  const company = readString(payload.company);
  const errors: Record<string, string> = {};

  if (!name) {
    errors.name = "Informe seu nome.";
  }

  if (!email) {
    errors.email = "Informe seu e-mail.";
  } else if (!isValidEmail(email)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (!message) {
    errors.message = "Escreva uma mensagem.";
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `A mensagem precisa ter pelo menos ${MIN_MESSAGE_LENGTH} caracteres.`;
  }

  return { name, email, subject, message, company, errors };
}

function getClientKey(request: NextRequest, email: string) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const vercelIp = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  return `${forwardedFor ?? vercelIp ?? "unknown"}:${email.toLowerCase()}`;
}

function isRateLimited(key: string) {
  const now = Date.now();
  const lastSentAt = rateLimitStore.get(key);

  if (lastSentAt && now - lastSentAt < RATE_LIMIT_WINDOW_MS) {
    return true;
  }

  rateLimitStore.set(key, now);
  return false;
}

function buildEmailContent({
  name,
  email,
  subject,
  message,
  sentAt
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt: string;
}) {
  const normalizedSubject = subject || "Contato pelo portfólio";
  const text = [
    "Nova mensagem pelo portfólio - Marcos Macêdo",
    "",
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Assunto informado: ${normalizedSubject}`,
    `Data/hora: ${sentAt}`,
    "Origem: portfólio pessoal",
    "",
    "Mensagem:",
    message
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0b1214; line-height: 1.6;">
      <h2>Nova mensagem pelo portfólio - Marcos Macêdo</h2>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
      <p><strong>Assunto informado:</strong> ${escapeHtml(normalizedSubject)}</p>
      <p><strong>Data/hora:</strong> ${escapeHtml(sentAt)}</p>
      <p><strong>Origem:</strong> portfólio pessoal</p>
      <hr />
      <p><strong>Mensagem:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    </div>
  `;

  return { text, html };
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Payload inválido." }, { status: 400 });
  }

  const { name, email, subject, message, company, errors } = validatePayload(payload);

  if (company) {
    return NextResponse.json({ message: "Mensagem enviada com sucesso. Obrigado pelo contato!" });
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        message: "Confira os campos destacados antes de enviar.",
        errors
      },
      { status: 400 }
    );
  }

  const dryRun = process.env.CONTACT_FORM_DRY_RUN === "true";
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? DEFAULT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!dryRun && (!resendApiKey || !fromEmail || !toEmail)) {
    return NextResponse.json(
      { message: "Envio de e-mail ainda não configurado no servidor." },
      { status: 503 }
    );
  }

  const clientKey = getClientKey(request, email);

  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { message: "Aguarde um minuto antes de enviar outra mensagem." },
      { status: 429 }
    );
  }

  const sentAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo"
  }).format(new Date());
  const { text, html } = buildEmailContent({ name, email, subject, message, sentAt });

  if (dryRun) {
    return NextResponse.json({
      message: "Mensagem enviada com sucesso. Obrigado pelo contato!",
      dryRun: true
    });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID()
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: "Nova mensagem pelo portfólio - Marcos Macêdo",
        reply_to: email,
        text,
        html,
        tags: [{ name: "source", value: "portfolio" }]
      })
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Resend contact form error:", details);

      return NextResponse.json(
        {
          message:
            "Não foi possível enviar sua mensagem agora. Tente novamente em alguns minutos ou me chame pelo LinkedIn/GitHub."
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Mensagem enviada com sucesso. Obrigado pelo contato!" });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        message:
          "Não foi possível enviar sua mensagem agora. Tente novamente em alguns minutos ou me chame pelo LinkedIn/GitHub."
      },
      { status: 502 }
    );
  }
}
