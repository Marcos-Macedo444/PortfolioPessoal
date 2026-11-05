import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/data/profile";

const display = localFont({
  src: "../../public/fonts/space-grotesk-variable.ttf",
  variable: "--font-display",
  display: "swap",
  weight: "400 700",
});
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcosmacedo.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Marcos Macêdo | Técnico de Networking I — NOC",
  description:
    "Marcos Macêdo, Técnico de Networking I — NOC na Vision Cybersecurity. Redes, infraestrutura, segurança defensiva e projetos de automação em Vitória, ES.",
  applicationName: "Marcos Macedo Portfolio",
  authors: [{ name: "Marcos Macêdo" }],
  keywords: [
    "Marcos Macedo",
    "portfolio",
    "seguranca defensiva",
    "infraestrutura",
    "automacao",
    "backend",
    "Python",
    "NOC",
  ],
  openGraph: {
    title: "Marcos Macêdo | Técnico de Networking I — NOC",
    description:
      "Técnico de Networking I — NOC na Vision Cybersecurity. Trajetória, redes, infraestrutura, segurança e projetos de software de Marcos Macêdo.",
    url: siteUrl,
    siteName: "Marcos Macedo Portfolio",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcos Macêdo | Técnico de Networking I — NOC",
    description:
      "Técnico de Networking I — NOC na Vision Cybersecurity. Redes, infraestrutura e automação em Vitória, ES.",
  },
  icons: {
    icon: "/icons/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-theme="system" suppressHydrationWarning>
      <head>
        {/* Apply persisted preferences before paint, using a same-origin CSP-compatible file. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/preferences.js" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              url: siteUrl,
              jobTitle: profile.title,
              worksFor: { "@type": "Organization", name: profile.company },
              sameAs: [profile.githubUrl, profile.linkedinUrl],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Vitória",
                addressRegion: "ES",
                addressCountry: "BR",
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={display.variable}>
        <a className="skip-link" href="#main-content">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
