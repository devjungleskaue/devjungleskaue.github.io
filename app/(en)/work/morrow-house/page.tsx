import type { Metadata } from "next";
import { CasePage } from "../../../components/CasePage";

export const metadata: Metadata = {
  title: "Morrow House · WooCommerce case",
  description:
    "A conceptual WooCommerce storefront with public source, a reproducible setup and a temporary WordPress Playground demo.",
  alternates: {
    canonical: "/work/morrow-house/",
    languages: {
      en: "/work/morrow-house/",
      "pt-BR": "/pt/trabalhos/morrow-house/",
    },
  },
  openGraph: {
    type: "website",
    url: "/work/morrow-house/",
    title: "Morrow House · WooCommerce case",
    description:
      "A conceptual storefront with public source, a reproducible setup and a temporary WordPress Playground demo.",
    locale: "en_US",
    alternateLocale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "Morrow House · WooCommerce case",
    description:
      "A conceptual storefront with public source, a reproducible setup and a temporary WordPress Playground demo.",
  },
};

export default function MorrowHouse() {
  return <CasePage locale="en" />;
}
