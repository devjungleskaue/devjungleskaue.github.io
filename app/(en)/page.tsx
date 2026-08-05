import type { Metadata } from "next";
import { PortfolioPage } from "../components/PortfolioPage";
import { copy } from "../content";

export const metadata: Metadata = {
  title: "Kaue Natan Jungles · Web & Full-Stack Developer",
  description:
    "Kaue Natan Jungles builds responsive, accessible web products and documents full-stack case studies.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "pt-BR": "/pt/",
    },
  },
  openGraph: {
    type: "profile",
    url: "/",
    title: "Kaue Natan Jungles · Web & Full-Stack Developer",
    description:
      "Responsive, accessible web products and documented full-stack case studies.",
    locale: "en_US",
    alternateLocale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Kaue Natan Jungles · Web & Full-Stack Developer",
    description:
      "Responsive, accessible web products and documented full-stack case studies.",
  },
};

export default function Home() {
  return <PortfolioPage content={copy.en} />;
}
