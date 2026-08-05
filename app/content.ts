export type Locale = "en" | "pt";

export type ProjectRecord = {
  title: string;
  label: string;
  summary: string;
  proof: string;
  stack: string[];
  href: string;
  sourceLabel: string;
  sourceHref: string;
};

export type PortfolioCopy = {
  locale: Locale;
  languageLabel: string;
  languageHref: string;
  skip: string;
  nav: { work: string; approach: string; contact: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primary: string;
    secondary: string;
  };
  work: {
    eyebrow: string;
    title: string;
    intro: string;
    projects: ProjectRecord[];
  };
  capabilities: {
    title: string;
    items: Array<{ title: string; body: string }>;
  };
  approach: { title: string; body: string; steps: string[] };
  contact: { eyebrow: string; title: string; body: string; action: string };
  footer: string;
};

export const profileLinks = {
  github: "https://github.com/devjungleskaue",
  linkedin: "https://www.linkedin.com/in/kaue-natan-jungles/",
} as const;

const projects = {
  en: [
    {
      title: "Morrow House",
      label: "Custom WooCommerce storefront",
      summary:
        "A conceptual store for a fictional Toronto home-goods business. The build covers an editable catalog, accessible shopping paths and a demonstration checkout with payments disabled.",
      proof:
        "Public theme and plugin source, Docker setup, automated checks and a temporary WordPress Playground demo.",
      stack: ["WordPress", "WooCommerce", "Elementor Free", "PHP", "CSS"],
      href: "/work/morrow-house/",
      sourceLabel: "View source",
      sourceHref:
        "https://github.com/devjungleskaue/morrow-house-wordpress-case",
    },
    {
      title: "Secure real-time platform",
      label: "Architecture & security case",
      summary:
        "A public account of the architecture, security boundaries, tests and real-time behavior behind a private project. Client data, credentials and operational details stay private.",
      proof:
        "The case explains the system's security boundaries, how I tested them and why I chose them. The public case explains the trust boundaries, session and MFA controls, real-time delivery model, row-level data isolation, failure paths and verification strategy without publishing private product details.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Security", "Testing"],
      href: "https://github.com/devjungleskaue/secure-realtime-platform-case-study",
      sourceLabel: "Read the case",
      sourceHref:
        "https://github.com/devjungleskaue/secure-realtime-platform-case-study",
    },
    {
      title: "Truckstar",
      label: "Desktop workshop application",
      summary:
        "A Senac integrator project for truck-workshop operations, built as a public Python and MySQL desktop application.",
      proof:
        "The repository includes service-order workflows, role-based access, PDF generation and transactional email.",
      stack: ["Python", "MySQL", "Desktop UI"],
      href: "https://github.com/devjungleskaue/truckstar_projetointegrador_senac",
      sourceLabel: "View source",
      sourceHref:
        "https://github.com/devjungleskaue/truckstar_projetointegrador_senac",
    },
  ],
  pt: [
    {
      title: "Morrow House",
      label: "Loja WooCommerce personalizada",
      summary:
        "Uma loja conceitual para uma marca fictícia de objetos para casa em Toronto. O projeto inclui catálogo editável, navegação de compra acessível e checkout demonstrativo sem pagamentos.",
      proof:
        "Tema e plugin públicos, ambiente Docker, verificações automatizadas e uma demo temporária no WordPress Playground.",
      stack: ["WordPress", "WooCommerce", "Elementor Free", "PHP", "CSS"],
      href: "/pt/trabalhos/morrow-house/",
      sourceLabel: "Ver código",
      sourceHref:
        "https://github.com/devjungleskaue/morrow-house-wordpress-case",
    },
    {
      title: "Plataforma segura em tempo real",
      label: "Case de arquitetura e segurança",
      summary:
        "Um relato público sobre a arquitetura, os limites de segurança, os testes e o funcionamento em tempo real de um projeto privado. Dados de clientes, credenciais e detalhes operacionais não fazem parte do case.",
      proof:
        "O case explica os limites de segurança do sistema, como eu os testei e por que escolhi cada um. O case público explica limites de confiança, controles de sessão e MFA, entrega em tempo real, isolamento de dados por linha, caminhos de falha e estratégia de verificação sem publicar detalhes do produto privado.",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Segurança", "Testes"],
      href: "https://github.com/devjungleskaue/secure-realtime-platform-case-study",
      sourceLabel: "Ler o case",
      sourceHref:
        "https://github.com/devjungleskaue/secure-realtime-platform-case-study",
    },
    {
      title: "Truckstar",
      label: "Aplicação desktop para oficina",
      summary:
        "Projeto integrador do Senac para a operação de uma oficina de caminhões, desenvolvido como aplicação desktop pública em Python e MySQL.",
      proof:
        "O repositório inclui ordens de serviço, controle de acesso por função, geração de PDF e envio de e-mail transacional.",
      stack: ["Python", "MySQL", "Interface desktop"],
      href: "https://github.com/devjungleskaue/truckstar_projetointegrador_senac",
      sourceLabel: "Ver código",
      sourceHref:
        "https://github.com/devjungleskaue/truckstar_projetointegrador_senac",
    },
  ],
} satisfies Record<Locale, ProjectRecord[]>;

export const copy: Record<Locale, PortfolioCopy> = {
  en: {
    locale: "en",
    languageLabel: "Português",
    languageHref: "/pt/",
    skip: "Skip to selected work",
    nav: { work: "Work", approach: "Approach", contact: "Contact" },
    hero: {
      eyebrow: "Kaue Natan Jungles · Web & Full-Stack Developer",
      title:
        "I build reliable web products, from the interface to the systems behind them.",
      lead:
        "My front-end work uses React and Next.js. Behind it, I work with Python, PostgreSQL and security-focused architecture. I also build WordPress and WooCommerce sites.",
      primary: "View selected work",
      secondary: "Open GitHub",
    },
    work: {
      eyebrow: "Selected work",
      title: "A few projects, with the decisions left in.",
      intro:
        "Open the source, run the demo, or read the technical case.",
      projects: projects.en,
    },
    capabilities: {
      title: "What I work on",
      items: [
        {
          title: "Front-end delivery",
          body: "I build responsive interfaces with clear interaction states, keyboard support and a consistent visual system.",
        },
        {
          title: "Full-stack foundations",
          body: "I work on APIs, relational data and application flows that remain understandable as the product grows.",
        },
        {
          title: "Security during implementation",
          body: "Validation, permissions, failure states and tests are part of the build, not a separate pass at the end.",
        },
      ],
    },
    approach: {
      title: "Start with the path that has to work.",
      body:
        "I begin with what a customer or operator needs to complete. Once that path works, I refine the details and document the trade-offs.",
      steps: [
        "Clarify the business goal.",
        "Build the shortest complete path.",
        "Test access, failure and responsive states.",
        "Document the trade-offs.",
      ],
    },
    contact: {
      eyebrow: "Open to new opportunities",
      title: "Available for web and full-stack roles.",
      body:
        "I am based in Santa Catarina, Brazil, work in English and Portuguese, and can collaborate with local or international teams.",
      action: "Contact me on LinkedIn",
    },
    footer: "Designed and built by Kaue Natan Jungles.",
  },
  pt: {
    locale: "pt",
    languageLabel: "English",
    languageHref: "/",
    skip: "Ir para os projetos selecionados",
    nav: { work: "Projetos", approach: "Processo", contact: "Contato" },
    hero: {
      eyebrow: "Kaue Natan Jungles · Desenvolvedor Web & Full-Stack",
      title:
        "Construo produtos web confiáveis, da interface aos sistemas por trás deles.",
      lead:
        "No front-end, trabalho com React e Next.js. Na base, uso Python, PostgreSQL e uma arquitetura pensada para segurança. Também desenvolvo sites em WordPress e WooCommerce.",
      primary: "Ver projetos",
      secondary: "Abrir GitHub",
    },
    work: {
      eyebrow: "Projetos selecionados",
      title: "Poucos projetos, com as decisões à mostra.",
      intro:
        "Abra o código, teste a demo ou leia o case técnico.",
      projects: projects.pt,
    },
    capabilities: {
      title: "Em que eu trabalho",
      items: [
        {
          title: "Entrega de front-end",
          body: "Crio interfaces responsivas com estados claros, suporte a teclado e uma direção visual consistente.",
        },
        {
          title: "Base full-stack",
          body: "Trabalho com APIs, dados relacionais e fluxos que continuam compreensíveis conforme o produto cresce.",
        },
        {
          title: "Segurança durante a implementação",
          body: "Validação, permissões, estados de falha e testes fazem parte do desenvolvimento, não de uma revisão isolada no fim.",
        },
      ],
    },
    approach: {
      title: "Começar pelo caminho que precisa funcionar.",
      body:
        "Primeiro, entendo o que a pessoa ou a operação precisa concluir. Com esse caminho funcionando, refino os detalhes e documento as escolhas.",
      steps: [
        "Entender o objetivo do negócio.",
        "Construir o menor caminho completo.",
        "Testar acesso, falhas e responsividade.",
        "Documentar as escolhas.",
      ],
    },
    contact: {
      eyebrow: "Aberto a novas oportunidades",
      title: "Disponível para vagas web e full-stack.",
      body:
        "Moro em Santa Catarina, trabalho em inglês e português e posso colaborar com equipes locais ou internacionais.",
      action: "Falar comigo no LinkedIn",
    },
    footer: "Design e desenvolvimento por Kaue Natan Jungles.",
  },
};
