// One-time setup for a new app made from the template (session 1). Puts the app's name and its
// GitHub repository into the docs, sets the start date, and dates the design wiki's pages.
// Run: npm run setup -- --name "My App" --repo you/my-app
// Refuses to run twice (when no {{APP_NAME}} is left).

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const option = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const name = option("name");
const repo = option("repo");
if (!name || !repo || !/^[\w.-]+\/[\w.-]+$/.test(repo)) {
  console.error('Usage: npm run setup -- --name "My App" --repo owner/repository');
  process.exit(1);
}

const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
const packageName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "app";

/** Text files to fill in: docs, the start prompt, the page, and the app's wording. */
function files(dir) {
  return readdirSync(dir).flatMap((entry) => {
    if (["node_modules", ".git", "dist", "test-results", "screenshots"].includes(entry)) return [];
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return files(path);
    return /\.(md|mdc|html|ts|json)$/.test(entry) ? [path] : [];
  });
}

const targets = files(root).filter((f) => !f.endsWith("package-lock.json"));
if (!targets.some((f) => readFileSync(f, "utf8").includes("{{APP_NAME}}"))) {
  console.error("Already set up: no {{APP_NAME}} left to fill in.");
  process.exit(1);
}

const changed = [];
for (const file of targets) {
  const before = readFileSync(file, "utf8");
  let after = before
    .replaceAll("{{APP_NAME}}", name)
    .replaceAll("{{REPO}}", repo)
    .replaceAll("{{START_DATE}}", today);
  if (file.endsWith("package.json")) after = after.replace(/"name": "[^"]*"/, `"name": "${packageName}"`);
  // The wiki's pages are checked against the code as it is now.
  if (relative(root, file).startsWith("docs/wiki/")) {
    after = after.replace(/^> \*\*Checked against the code:\*\* \d{4}-\d{2}-\d{2}/m, `> **Checked against the code:** ${today}`);
  }
  if (after !== before) {
    writeFileSync(file, after);
    changed.push(relative(root, file));
  }
}
console.log(`Set up "${name}" (${repo}), ${today}. Filled in:\n  ${changed.join("\n  ")}`);
console.log("Next: write docs/NORTH_STAR.md and docs/PLAN.md with the owner, then commit and push.");
