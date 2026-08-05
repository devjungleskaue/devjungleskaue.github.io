import type { Metadata, Viewport } from "next";
import { bodyFont, displayFont } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://devjungleskaue.github.io"),
  title: {
    default: "Kaue Natan Jungles · Desenvolvedor Web & Full-Stack",
    template: "%s · Kaue Natan Jungles",
  },
  description:
    "Desenvolvedor web e full-stack em Santa Catarina, com atuação em inglês e português junto a equipes locais ou internacionais.",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#faf8f3",
};

export default function PortugueseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
