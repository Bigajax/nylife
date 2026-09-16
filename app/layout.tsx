import type { Metadata } from "next";
import { Figtree, Fraunces } from "next/font/google";
import { site } from "@/data/site.config";
import "./globals.css";

/* Fraunces (com o eixo óptico e o SOFT) nos nomes e nos números grandes;
   Figtree no corpo, nos botões e na tabela. */
const display = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
  variable: "--fonte-display",
  display: "swap",
});
const corpo = Figtree({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--fonte-corpo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "NYLIFE Nutrition: nutrição inteligente para o seu bem-estar",
    template: "%s · NYLIFE Nutrition",
  },
  description:
    "Suplementos com fórmulas premium: Nutrição para sua Beleza com 300 mg de Keranat, Magnésio Elementar Premium 500 com quatro formas de magnésio e Vitamina Lipossomal D3, K2 e A. Pedidos pelo WhatsApp.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "NYLIFE Nutrition",
    url: site.url,
    title: "NYLIFE Nutrition: nutrição inteligente para o seu bem-estar",
    description: site.posicionamento,
    images: [{ url: "/og/site.jpg", width: 1200, height: 630, alt: "NYLIFE Nutrition" }],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${corpo.variable} antialiased`}>{children}</body>
    </html>
  );
}
