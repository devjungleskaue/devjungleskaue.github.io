import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, root), "utf8");
}

async function exists(relativePath) {
  try {
    await access(new URL(relativePath, root));
    return true;
  } catch {
    return false;
  }
}

const legacyDisplayName = `Kau${"\u00ea"} Natan Jungles`;
const legacyLinkedInSuffix = ["2218", "b8370"].join("");
const legacyDemoTag = ["v1", "0", "1"].join(".");
const canonicalLinkedIn = "https://www.linkedin.com/in/kaue-natan-jungles/";

test("keeps only the runtime needed for a static Next.js portfolio", async () => {
  const packageJson = JSON.parse(await read("package.json"));
  const expectedDependencies = ["next", "react", "react-dom"];
  const expectedDevDependencies = [
    "@types/node",
    "@types/react",
    "@types/react-dom",
    "eslint",
    "eslint-config-next",
    "typescript",
  ];

  assert.deepEqual(Object.keys(packageJson.dependencies).sort(), expectedDependencies);
  assert.deepEqual(
    Object.keys(packageJson.devDependencies).sort(),
    expectedDevDependencies,
  );
  assert.equal(packageJson.dependencies.next, "16.2.12");
  assert.equal(packageJson.devDependencies["eslint-config-next"], "16.2.12");
  assert.equal(packageJson.scripts.dev, "next dev");
  assert.equal(packageJson.scripts.build, "next build");

  for (const stalePath of [
    "build/sites-vite-plugin.ts",
    "db/index.ts",
    "examples/d1/db/schema.ts",
    "vite.config.ts",
    "worker/index.ts",
  ]) {
    assert.equal(await exists(stalePath), false, `${stalePath} should be absent`);
  }
});

test("sets the document language from each static route group", async () => {
  const [englishLayout, portugueseLayout] = await Promise.all([
    read("app/(en)/layout.tsx"),
    read("app/(pt)/layout.tsx"),
  ]);

  assert.match(englishLayout, /<html lang="en">/);
  assert.match(portugueseLayout, /<html lang="pt-BR">/);
  assert.match(englishLayout, /icon:\s*"\/favicon\.svg"/);
  assert.match(portugueseLayout, /icon:\s*"\/favicon\.svg"/);
  assert.match(englishLayout, /themeColor:\s*"#faf8f3"/);
  assert.match(portugueseLayout, /themeColor:\s*"#faf8f3"/);
});

test("uses normal document navigation on a rewrite-free static host", async () => {
  const [portfolioPage, casePage, notFound] = await Promise.all([
    read("app/components/PortfolioPage.tsx"),
    read("app/components/CasePage.tsx"),
    read("app/global-not-found.tsx"),
  ]);

  assert.doesNotMatch(portfolioPage + casePage + notFound, /next\/link/);
  assert.match(portfolioPage, /<a\s+href=\{content\.languageHref\}/);
  assert.match(portfolioPage, /lang=\{content\.locale === "en" \? "pt-BR" : "en"\}/);
  assert.match(casePage, /<a\s+href=\{text\.languageHref\}/);
  assert.match(casePage, /lang=\{pt \? "en" : "pt-BR"\}/);
  assert.match(notFound, /<a className="button button--primary" href="\/">/);
  assert.match(notFound, /title:\s*"Page not found · Kaue Natan Jungles"/);
});

test("uses the canonical public identity and profile links", async () => {
  const source = (
    await Promise.all([
      read("app/content.ts"),
      read("app/components/PortfolioPage.tsx"),
      read("app/components/CasePage.tsx"),
      read("app/(en)/layout.tsx"),
      read("app/(en)/page.tsx"),
      read("app/(pt)/layout.tsx"),
      read("app/(pt)/pt/page.tsx"),
      read("app/global-not-found.tsx"),
      read("public/site.webmanifest"),
    ])
  ).join("\n");

  assert.match(source, /Kaue Natan Jungles/);
  assert.doesNotMatch(source, new RegExp(legacyDisplayName));
  const sourceLinkedIn = source.match(/linkedin:\s*"([^"]+)"/)?.[1];
  assert.equal(sourceLinkedIn, canonicalLinkedIn);
  assert.doesNotMatch(source, new RegExp(legacyLinkedInSuffix));
});

test("keeps general positioning broad outside the Morrow delivery case", async () => {
  const [content, englishLayout, portugueseLayout, englishHome, portugueseHome] =
    await Promise.all([
      read("app/content.ts"),
      read("app/(en)/layout.tsx"),
      read("app/(pt)/layout.tsx"),
      read("app/(en)/page.tsx"),
      read("app/(pt)/pt/page.tsx"),
    ]);

  assert.match(content, /My stack also includes WordPress and WooCommerce\./);
  assert.match(content, /Minha stack também inclui WordPress e WooCommerce\./);
  assert.match(content, /eyebrow: "Open to new opportunities"/);
  assert.match(content, /title: "Available for web and full-stack roles\."/);
  assert.match(
    content,
    /I am based in Santa Catarina, Brazil, work in English and Portuguese, and can collaborate with local or international teams\./,
  );
  assert.match(content, /eyebrow: "Aberto a novas oportunidades"/);
  assert.match(content, /title: "Disponível para vagas web e full-stack\."/);
  assert.match(
    content,
    /Moro em Santa Catarina, trabalho em inglês e português e posso colaborar com equipes locais ou internacionais\./,
  );
  const opportunitySource = content + englishLayout + portugueseLayout;
  for (const phrase of [
    "focus is remote",
    "available for remote",
    ["trabalho", "remoto"].join(" "),
    "oportunidades remotas",
  ]) {
    assert.doesNotMatch(opportunitySource, new RegExp(phrase, "i"));
  }
  assert.doesNotMatch(englishHome + portugueseHome, /WordPress|WooCommerce/);
  assert.match(englishHome, /full-stack case studies/);
  assert.match(portugueseHome, /cases full-stack/);
});

test("ships localized keyboard navigation and visible interaction states", async () => {
  const [casePage, css] = await Promise.all([
    read("app/components/CasePage.tsx"),
    read("app/globals.css"),
  ]);

  assert.match(casePage, /skip:\s*"Skip to case content"/);
  assert.match(casePage, /skip:\s*"Ir para o conteúdo do case"/);
  assert.match(casePage, /<a className="skip-link" href="#case-content">/);
  assert.match(casePage, /id="case-content"/);
  assert.match(css, /\.site-nav__links a:hover/);
  assert.match(css, /\.button--primary:hover/);
  assert.match(css, /\.proof button:hover/);
  assert.match(css, /\.case__back:hover/);
});

test("describes the public evidence precisely", async () => {
  const [content, casePage] = await Promise.all([
    read("app/content.ts"),
    read("app/components/CasePage.tsx"),
  ]);

  assert.match(content, /Architecture & security case/);
  assert.match(
    content,
    /Open the source, run the demo, or read the technical case\./,
  );
  assert.match(
    content,
    /Abra o código, teste a demo ou leia o case técnico\./,
  );
  assert.match(casePage, /A small working model for this case page/);
  assert.match(casePage, /Um pequeno modelo interativo criado para esta página/);
  assert.match(
    casePage,
    /morrow-house-wordpress-case\/v1\.1\.0\/blueprint\.json/,
  );
  assert.doesNotMatch(casePage, new RegExp(legacyDemoTag.replaceAll(".", "\\.")));
});

test("publishes a branded icon, manifest and Pages workflow", async () => {
  const [favicon, manifest, workflow, readme] = await Promise.all([
    read("public/favicon.svg"),
    read("public/site.webmanifest"),
    read(".github/workflows/deploy-pages.yml"),
    read("README.md"),
  ]);

  assert.match(favicon, />KNJ</);
  assert.equal(JSON.parse(manifest).icons[0].src, "/favicon.svg");
  const pinnedActions = [...workflow.matchAll(/uses:\s*[^@\s]+@([0-9a-f]{40})/g)];
  assert.equal(pinnedActions.length, 5);
  assert.match(workflow, /npm audit --audit-level=high/);
  assert.equal((await read("public/.nojekyll")).trim(), "");
  assert.match(readme, /npm run dev/);
  assert.match(readme, /npm test/);
});
