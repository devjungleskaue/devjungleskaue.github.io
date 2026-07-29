import type { Locale } from "../content";
import { MakerMark } from "./MakerMark";
import { ProjectProof } from "./ProjectProof";

const playgroundUrl =
  "https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/devjungleskaue/morrow-house-wordpress-case/v1.0.1/blueprint.json";
const sourceUrl =
  "https://github.com/devjungleskaue/morrow-house-wordpress-case";

const caseCopy = {
  en: {
    skip: "Skip to case content",
    nav: "Case navigation",
    home: "Portfolio",
    language: "Português",
    languageHref: "/pt/trabalhos/morrow-house/",
    back: "Back to selected work",
    label: "Concept build · WooCommerce",
    title: "Morrow House, a storefront built to be taken apart",
    intro:
      "I built Morrow House to show how I would handle a small WooCommerce shop when campaigns and product details still need to be editable after hand-off.",
    disclosure:
      "Morrow House is a conceptual build. It is not client work, and the store cannot take orders: payments are disabled.",
    sampleTitle: "Try one part of the product journey",
    sampleIntro:
      "A small working model for this case page: change the quantity, save it and check each state with a mouse or keyboard.",
    constraintsTitle: "What the build had to respect",
    constraints: [
      "The stack stays on WordPress, WooCommerce and Elementor Free. There is no paid theme or plugin.",
      "Store content remains editable through familiar WordPress and WooCommerce screens.",
      "Every name, price and contact detail is fictional sample data.",
    ],
    decisionsTitle: "Where each responsibility lives",
    decisions:
      "The theme owns layout, navigation and WooCommerce presentation. A small companion plugin handles demo safeguards and product fields. The seed script creates the same catalogue and pages each time, so the public build can be checked from a clean install.",
    proofTitle: "Where to inspect the work",
    proof:
      "The repository contains the theme and plugin source, Docker setup, Playground Blueprint, automated checks and integration tests. Its README documents the exact scope and the parts a real store would still need.",
    temporary:
      "WordPress Playground builds a disposable copy from that public source. The session starts fresh and its data is cleared when you close it.",
    demo: "Open the temporary store",
    source: "Read the source and checks",
    footer: "Concept and implementation by Kauê Natan Jungles.",
  },
  pt: {
    skip: "Ir para o conteúdo do case",
    nav: "Navegação do case",
    home: "Portfólio",
    language: "English",
    languageHref: "/work/morrow-house/",
    back: "Voltar aos projetos",
    label: "Projeto conceitual · WooCommerce",
    title: "Morrow House, uma loja feita para ser examinada",
    intro:
      "Criei a Morrow House para mostrar como eu estruturaria uma pequena loja em WooCommerce sem prender campanhas e produtos ao código depois da entrega.",
    disclosure:
      "Morrow House é um projeto conceitual. Não é trabalho para cliente e a loja não recebe pedidos: os pagamentos estão desativados.",
    sampleTitle: "Teste uma parte da jornada de compra",
    sampleIntro:
      "Um pequeno modelo interativo criado para esta página: altere a quantidade, guarde a escolha e confira os estados usando mouse ou teclado.",
    constraintsTitle: "Limites do projeto",
    constraints: [
      "A base usa WordPress, WooCommerce e Elementor Free, sem tema ou plugin pago.",
      "O conteúdo da loja continua editável pelas telas conhecidas do WordPress e do WooCommerce.",
      "Nomes, preços e dados de contato são amostras fictícias.",
    ],
    decisionsTitle: "Como dividi as responsabilidades",
    decisions:
      "O tema cuida do layout, da navegação e da apresentação do WooCommerce. Um plugin pequeno concentra as proteções da demo e os campos de produto. Já o script de carga recria páginas e catálogo desde o início, o que permite conferir o resultado em uma instalação limpa.",
    proofTitle: "Onde conferir",
    proof:
      "O repositório público reúne o tema, o plugin, o ambiente Docker, o Blueprint do Playground e os testes automatizados. O README também deixa claro o escopo e o que ainda seria necessário em uma loja real.",
    temporary:
      "O WordPress Playground monta uma cópia descartável a partir desse código. Cada sessão começa limpa e perde os dados ao ser encerrada.",
    demo: "Abrir a loja temporária",
    source: "Ver código e testes",
    footer: "Conceito e implementação por Kauê Natan Jungles.",
  },
} satisfies Record<
  Locale,
  {
    skip: string;
    nav: string;
    home: string;
    language: string;
    languageHref: string;
    back: string;
    label: string;
    title: string;
    intro: string;
    disclosure: string;
    sampleTitle: string;
    sampleIntro: string;
    constraintsTitle: string;
    constraints: string[];
    decisionsTitle: string;
    decisions: string;
    proofTitle: string;
    proof: string;
    temporary: string;
    demo: string;
    source: string;
    footer: string;
  }
>;

export function CasePage({ locale }: { locale: Locale }) {
  const text = caseCopy[locale];
  const pt = locale === "pt";
  const homeHref = pt ? "/pt/" : "/";

  return (
    <div className="portfolio-shell" lang={pt ? "pt-BR" : "en"}>
      <a className="skip-link" href="#case-content">
        {text.skip}
      </a>

      <nav className="site-nav" aria-label={text.nav}>
        <div className="site-nav__inner">
          <a className="wordmark" href={homeHref}>
            Kauê Natan Jungles
          </a>
          <div className="site-nav__links">
            <a href={homeHref}>{text.home}</a>
            <a href={sourceUrl}>GitHub</a>
            <a
              href={text.languageHref}
              hrefLang={pt ? "en" : "pt-BR"}
              lang={pt ? "en" : "pt-BR"}
            >
              {text.language}
            </a>
          </div>
        </div>
      </nav>

      <main className="case page-column" id="case-content">
        <a className="case__back" href={`${homeHref}#work`}>
          {text.back}
        </a>

        <header className="case__hero">
          <div className="case__identity">
            <MakerMark />
            <p className="eyebrow">{text.label}</p>
          </div>
          <h1>{text.title}</h1>
          <p className="case__intro">{text.intro}</p>
          <p className="case__disclosure">{text.disclosure}</p>
        </header>

        <section
          className="case__demo"
          aria-labelledby="case-sample-title"
        >
          <div className="section-heading">
            <h2 id="case-sample-title">{text.sampleTitle}</h2>
            <p>{text.sampleIntro}</p>
          </div>
          <ProjectProof locale={locale} />
        </section>

        <section
          className="case__section"
          aria-labelledby="case-constraints-title"
        >
          <h2 id="case-constraints-title">{text.constraintsTitle}</h2>
          <ul>
            {text.constraints.map((constraint) => (
              <li key={constraint}>{constraint}</li>
            ))}
          </ul>
        </section>

        <section
          className="case__section"
          aria-labelledby="case-decisions-title"
        >
          <h2 id="case-decisions-title">{text.decisionsTitle}</h2>
          <p>{text.decisions}</p>
        </section>

        <section
          className="case__section"
          aria-labelledby="case-proof-title"
        >
          <h2 id="case-proof-title">{text.proofTitle}</h2>
          <p>{text.proof}</p>
          <p>{text.temporary}</p>
          <div className="actions">
            <a className="button button--primary" href={playgroundUrl}>
              {text.demo}
            </a>
            <a className="button" href={sourceUrl}>
              {text.source}
            </a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer__inner">
          <p>{text.footer}</p>
          <MakerMark compact />
        </div>
      </footer>
    </div>
  );
}
