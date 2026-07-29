import type { Metadata } from "next";
import { CasePage } from "../../../../components/CasePage";

export const metadata: Metadata = {
  title: "Morrow House · Case WooCommerce",
  description:
    "Uma loja WooCommerce conceitual, com código público, ambiente reproduzível e demo temporária no WordPress Playground.",
  alternates: {
    canonical: "/pt/trabalhos/morrow-house/",
    languages: {
      en: "/work/morrow-house/",
      "pt-BR": "/pt/trabalhos/morrow-house/",
    },
  },
  openGraph: {
    type: "website",
    url: "/pt/trabalhos/morrow-house/",
    title: "Morrow House · Case WooCommerce",
    description:
      "Uma loja conceitual com código público, ambiente reproduzível e demo temporária no WordPress Playground.",
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Morrow House · Case WooCommerce",
    description:
      "Uma loja conceitual com código público, ambiente reproduzível e demo temporária no WordPress Playground.",
  },
};

export default function MorrowHousePt() {
  return <CasePage locale="pt" />;
}
