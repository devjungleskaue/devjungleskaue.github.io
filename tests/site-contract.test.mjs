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
  assert.match(notFound, /title:\s*"Page not found · Kauê Natan Jungles"/);
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
    /morrow-house-wordpress-case\/v1\.0\.1\/blueprint\.json/,
  );
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
