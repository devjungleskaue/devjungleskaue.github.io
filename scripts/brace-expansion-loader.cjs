const Module = require("node:module");

const load = Module._load;

Module._load = function loadWithLegacyDefault(request, parent, isMain) {
  const loaded = load.call(this, request, parent, isMain);

  if (
    request === "brace-expansion" &&
    typeof loaded !== "function" &&
    typeof loaded.expand === "function"
  ) {
    const expand = loaded.expand;
    Object.assign(expand, loaded);
    return expand;
  }

  return loaded;
};
