import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Marcos Macêdo | Cybersecurity, Infraestrutura e Automação",
  description:
    "Portfólio de Marcos Macêdo, focado em cybersecurity, infraestrutura, automação, backend e desenvolvimento de soluções tecnológicas.",
  applicationName: "Marcos Macedo Portfolio",
  authors: [{ name: "Marcos Macêdo" }],
  keywords: [
    "Marcos Macedo",
    "portfolio",
    "cybersecurity",
    "infraestrutura",
    "automacao",
    "backend",
    "Python",
    "hackathon",
    "Hack27"
  ],
  openGraph: {
    title: "Marcos Macêdo | Cybersecurity, Infraestrutura e Automação",
    description:
      "Portfólio profissional com foco em cybersecurity, infraestrutura, automação e desenvolvimento de soluções reais.",
    url: siteUrl,
    siteName: "Marcos Macedo Portfolio",
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcos Macêdo | Cybersecurity, Infraestrutura e Automação",
    description:
      "Portfólio de Marcos Macêdo, focado em cybersecurity, infraestrutura e automação."
  },
  icons: {
    icon: "/icons/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
