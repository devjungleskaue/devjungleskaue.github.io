import type { Metadata } from "next";
import { PortfolioPage } from "../components/PortfolioPage";
import { copy } from "../content";

export const metadata: Metadata = {
  title: "Kaue Natan Jungles · Web & Full-Stack Developer",
  description:
    "Kaue Natan Jungles builds responsive, accessible web products across front-end, full-stack and WordPress work.",
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
      "Responsive, accessible web products across front-end, full-stack and WordPress work.",
    locale: "en_US",
    alternateLocale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Kaue Natan Jungles · Web & Full-Stack Developer",
    description:
      "Responsive, accessible web products across front-end, full-stack and WordPress work.",
  },
};

export default function Home() {
  return <PortfolioPage content={copy.en} />;
}
