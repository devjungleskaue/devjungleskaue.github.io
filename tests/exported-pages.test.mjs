import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import test from "node:test";

const legacyDisplayName = `Kau${"\u00ea"} Natan Jungles`;
const legacyLinkedInSuffix = ["2218", "b8370"].join("");
const legacyDemoTag = ["v1", "0", "1"].join(".");

const pages = [
  ["English home", "../out/index.html", /I build reliable web products/],
  [
    "Portuguese home",
    "../out/pt/index.html",
    /Construo produtos web confiáveis/,
  ],
  [
    "English Morrow House case",
    "../out/work/morrow-house/index.html",
    /Morrow House is a conceptual build/,
  ],
  [
    "Portuguese Morrow House case",
    "../out/pt/trabalhos/morrow-house/index.html",
    /Morrow House é um projeto conceitual/,
  ],
  ["not-found page", "../out/404.html", /That page is not here/],
];

for (const [name, path, expected] of pages) {
  test(`exports the ${name}`, async () => {
    const html = await readFile(new URL(path, import.meta.url), "utf8");
    assert.match(html, expected);
  });
}

test("exports the correct document language for each locale", async () => {
  const [englishHome, portugueseHome, englishCase, portugueseCase] =
    await Promise.all([
      readFile(new URL("../out/index.html", import.meta.url), "utf8"),
      readFile(new URL("../out/pt/index.html", import.meta.url), "utf8"),
      readFile(
        new URL("../out/work/morrow-house/index.html", import.meta.url),
        "utf8",
      ),
      readFile(
        new URL("../out/pt/trabalhos/morrow-house/index.html", import.meta.url),
        "utf8",
      ),
    ]);

  assert.match(englishHome, /<html lang="en"/);
  assert.match(englishCase, /<html lang="en"/);
  assert.match(portugueseHome, /<html lang="pt-BR"/);
  assert.match(portugueseCase, /<html lang="pt-BR"/);
});

test("exports public profile, case and canonical links", async () => {
  const [home, casePage] = await Promise.all([
    readFile(new URL("../out/index.html", import.meta.url), "utf8"),
    readFile(
      new URL("../out/work/morrow-house/index.html", import.meta.url),
      "utf8",
    ),
  ]);
  const canonical = "https://devjungleskaue.github.io/work/morrow-house/";

  assert.match(home, /github\.com\/devjungleskaue/);
  assert.match(home, /linkedin\.com\/in\/kaue-natan-jungles\//);
  assert.doesNotMatch(home, new RegExp(legacyLinkedInSuffix));
  assert.match(home, /Kaue Natan Jungles/);
  assert.doesNotMatch(home + casePage, new RegExp(legacyDisplayName));
  assert.match(home, /\/work\/morrow-house\//);
  assert.match(
    casePage,
    /morrow-house-wordpress-case\/v1\.1\.0\/blueprint\.json/,
  );
  assert.doesNotMatch(
    casePage,
    new RegExp(legacyDemoTag.replaceAll(".", "\\.")),
  );
  assert.match(casePage, new RegExp(`rel="canonical" href="${canonical}"`));
  assert.match(
    casePage,
    new RegExp(`property="og:url" content="${canonical}"`),
  );
});

test("keeps the self-hosted font payload below one megabyte", async () => {
  const mediaDirectory = new URL("../out/_next/static/media/", import.meta.url);
  const fontFiles = (await readdir(mediaDirectory)).filter((name) =>
    name.endsWith(".woff2"),
  );
  const sizes = await Promise.all(
    fontFiles.map((name) => stat(new URL(name, mediaDirectory))),
  );
  const totalBytes = sizes.reduce((total, file) => total + file.size, 0);

  assert.ok(fontFiles.length <= 5, `found ${fontFiles.length} font files`);
  assert.ok(totalBytes <= 1_000_000, `font payload is ${totalBytes} bytes`);
});
