const assert = require("node:assert/strict");
const test = require("node:test");

test("exposes the secured brace expander to older lint plugins", () => {
  require("../scripts/brace-expansion-loader.cjs");
  const expand = require("brace-expansion");

  assert.equal(typeof expand, "function");
  assert.deepEqual(expand("src/{app,tests}"), ["src/app", "src/tests"]);
});
