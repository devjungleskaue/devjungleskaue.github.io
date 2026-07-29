import type { Metadata } from "next";
import { PortfolioPage } from "../../components/PortfolioPage";
import { copy } from "../../content";

export const metadata: Metadata = {
  title: "Desenvolvedor Web & Full-Stack",
  description:
    "Kauê Natan Jungles desenvolve produtos web responsivos e acessíveis, do front-end ao full-stack e WordPress.",
  alternates: {
    canonical: "/pt/",
    languages: {
      en: "/",
      "pt-BR": "/pt/",
    },
  },
  openGraph: {
    type: "profile",
    url: "/pt/",
    title: "Kauê Natan Jungles · Desenvolvedor Web & Full-Stack",
    description:
      "Produtos web responsivos e acessíveis, do front-end ao full-stack e WordPress.",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Kauê Natan Jungles · Desenvolvedor Web & Full-Stack",
    description:
      "Produtos web responsivos e acessíveis, do front-end ao full-stack e WordPress.",
  },
};

export default function HomePt() {
  return <PortfolioPage content={copy.pt} />;
}
