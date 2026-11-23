// Checks every installed package's licence against the project rules
// (docs/THIRD_PARTY_LICENSES.md): permissive or LGPL only, never GPL or AGPL.
// Reads package-lock.json, so it covers indirect dependencies too.
// Exit code 1 means a forbidden or unknown licence was found.

import { readFileSync } from "node:fs";

const lock = JSON.parse(readFileSync(new URL("../package-lock.json", import.meta.url), "utf8"));

const ALLOWED = [
  "MIT", "MIT-0", "ISC", "BSD-2-Clause", "BSD-3-Clause", "0BSD", "Apache-2.0",
  "BlueOak-1.0.0", "CC0-1.0", "CC-BY-4.0", "Python-2.0", "Unlicense", "MulanPSL-2.0",
  "LGPL-2.0-or-later", "LGPL-2.1", "LGPL-2.1-only", "LGPL-2.1-or-later",
  "LGPL-3.0", "LGPL-3.0-only", "LGPL-3.0-or-later",
];

// An SPDX expression like "(MIT OR GPL-3.0)" is fine if any OR-branch is allowed.
function isAllowed(expr) {
  const cleaned = expr.replace(/[()]/g, "").trim();
  return cleaned.split(/\s+OR\s+/i).some((alt) =>
    alt.split(/\s+AND\s+/i).every((id) => ALLOWED.includes(id.trim())),
  );
}

const counts = new Map();
const problems = [];
for (const [path, info] of Object.entries(lock.packages ?? {})) {
  if (!path) continue; // the project itself
  const name = path.replace(/^.*node_modules\//, "");
  const licence = info.license ?? "UNKNOWN";
  counts.set(licence, (counts.get(licence) ?? 0) + 1);
  if (!isAllowed(licence)) problems.push(`${name}@${info.version}: ${licence}`);
}

console.log("Licences in use:");
for (const [licence, n] of [...counts].sort((a, b) => b[1] - a[1])) console.log(`  ${licence}: ${n}`);

if (problems.length) {
  console.error("\nNot allowed or unknown (see docs/THIRD_PARTY_LICENSES.md):");
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
console.log("\nAll licences allowed.");
