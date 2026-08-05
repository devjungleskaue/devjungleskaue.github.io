import type { Metadata } from "next";
import { PortfolioPage } from "../../components/PortfolioPage";
import { copy } from "../../content";

export const metadata: Metadata = {
  title: "Desenvolvedor Web & Full-Stack",
  description:
    "Kaue Natan Jungles desenvolve produtos web responsivos e acessíveis e documenta cases full-stack.",
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
    title: "Kaue Natan Jungles · Desenvolvedor Web & Full-Stack",
    description:
      "Produtos web responsivos e acessíveis, com cases full-stack documentados.",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Kaue Natan Jungles · Desenvolvedor Web & Full-Stack",
    description:
      "Produtos web responsivos e acessíveis, com cases full-stack documentados.",
  },
};

export default function HomePt() {
  return <PortfolioPage content={copy.pt} />;
}
