import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(relativePath) {
  return readFile(new URL(relativePath, import.meta.url), "utf8");
}

test("contains factual bilingual project copy and public links", async () => {
  const content = await read("../app/content.ts");

  assert.match(content, /I build reliable web products/);
  assert.match(content, /Construo produtos web confiáveis/);
  assert.match(
    content,
    /github\.com\/devjungleskaue\/secure-realtime-platform-case-study/,
  );
  assert.match(
    content,
    /github\.com\/devjungleskaue\/truckstar_projetointegrador_senac/,
  );
  assert.match(content, /Architecture & security case/);
  assert.match(content, /Case de arquitetura e segurança/);
});

test("uses a keyboard-friendly, CSS-led component system", async () => {
  const [page, proof, mark, css] = await Promise.all([
    read("../app/components/PortfolioPage.tsx"),
    read("../app/components/ProjectProof.tsx"),
    read("../app/components/MakerMark.tsx"),
    read("../app/globals.css"),
  ]);

  assert.match(page, /<main/);
  assert.match(page, /<section/);
  assert.match(page, /aria-label/);
  assert.match(page, /className="site-nav"/);
  assert.match(page, /className="project"/);
  assert.match(proof, /type="range"/);
  assert.match(proof, /<label/);
  assert.match(proof, /aria-live="polite"/);
  assert.match(proof, /type="button"/);
  assert.match(mark, /aria-hidden="true"/);
  assert.match(css, /--velvet:\s*#690d18/i);
  assert.match(css, /max-width:\s*900px/i);
  assert.match(css, /position:\s*sticky/i);
  assert.match(css, /backdrop-filter:\s*blur\(8px\)/i);
  assert.match(css, /focus-visible/i);
  assert.match(css, /min-height:\s*44px/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/i);
  assert.doesNotMatch(page + proof + mark, /<img/i);
});

test("defines English and Portuguese portfolio and case routes", async () => {
  const [home, homePt, caseEn, casePt] = await Promise.all([
    read("../app/(en)/page.tsx"),
    read("../app/(pt)/pt/page.tsx"),
    read("../app/(en)/work/morrow-house/page.tsx"),
    read("../app/(pt)/pt/trabalhos/morrow-house/page.tsx"),
  ]);

  assert.match(home, /<PortfolioPage content=\{copy\.en\}/);
  assert.match(homePt, /<PortfolioPage content=\{copy\.pt\}/);
  assert.match(caseEn, /<CasePage locale="en"/);
  assert.match(casePt, /<CasePage locale="pt"/);
  assert.match(homePt, /url:\s*"\/pt\/"/);
  assert.match(caseEn, /url:\s*"\/work\/morrow-house\/"/);
  assert.match(casePt, /url:\s*"\/pt\/trabalhos\/morrow-house\/"/);
});

test("presents the Morrow House build with inspectable evidence", async () => {
  const casePage = await read("../app/components/CasePage.tsx");

  assert.match(casePage, /Morrow House is a conceptual build/);
  assert.match(casePage, /Morrow House é um projeto conceitual/);
  assert.match(casePage, /payments are disabled/i);
  assert.match(casePage, /pagamentos estão desativados/i);
  assert.match(
    casePage,
    /playground\.wordpress\.net\/\?blueprint-url=https:\/\/raw\.githubusercontent\.com\/devjungleskaue\/morrow-house-wordpress-case\/v1\.0\.1\/blueprint\.json/,
  );
  assert.match(
    casePage,
    /github\.com\/devjungleskaue\/morrow-house-wordpress-case/,
  );
});

test("configures discoverable static pages and localized documents", async () => {
  const [englishLayout, portugueseLayout, config, robots, sitemap, manifest] =
    await Promise.all([
      read("../app/(en)/layout.tsx"),
      read("../app/(pt)/layout.tsx"),
      read("../next.config.ts"),
      read("../public/robots.txt"),
      read("../public/sitemap.xml"),
      read("../public/site.webmanifest"),
    ]);

  assert.match(englishLayout, /<html lang="en">/);
  assert.match(portugueseLayout, /<html lang="pt-BR">/);
  assert.match(config, /output:\s*"export"/);
  assert.match(config, /trailingSlash:\s*true/);
  assert.match(
    robots,
    /Sitemap: https:\/\/devjungleskaue\.github\.io\/sitemap\.xml/,
  );
  assert.match(sitemap, /\/pt\/trabalhos\/morrow-house\//);
  assert.equal(JSON.parse(manifest).short_name, "Kauê Jungles");
});
