// Checks that the design wiki (docs/wiki/) still matches the code (decision 4). The rules are
// explained in docs/wiki/editing-the-wiki.md. It fails (exit code 1) if:
//   1. a source file isn't on any page's "Covers" line;
//   2. a covered file, or a file a page links to, doesn't exist;
//   3. a linked code name, [`name`](path), no longer appears in that file;
//   4. a page mentions a decision or open question that isn't in COMS.md;
//   5. a covered file has uncommitted changes but none of the pages covering it does;
//   6. a covered file was committed after the page that covers it, and after the page's "Checked
//      against the code" date (one day's leeway), so a page made in the same commit is never stale;
//   7. a page is missing its Covers or Checked line, isn't linked from the home page, gives a test
//      count, or still has an "Unverified:" statement.
// Rules 5 and 6 need git; without it they're skipped, with a note.
// Run: npm run check:wiki

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const wikiDir = join(root, "docs", "wiki");
const rel = (path) => relative(root, path).split("\\").join("/");
const problems = new Set();
const fail = (message) => problems.add(message);

/** Every file under a folder, as a path from the repository's root. */
function walk(dir) {
  const full = join(root, dir);
  if (!existsSync(full)) return [];
  return readdirSync(full).flatMap((name) => {
    const path = join(full, name);
    return statSync(path).isDirectory() ? walk(rel(path)) : [rel(path)];
  });
}

// ---- what the wiki must describe: change these if the app's folders or languages change ----
/** Folders of source code, and which files in them count (unit tests and type declarations don't). */
const SOURCE = [
  { dir: "src", files: /\.(ts|tsx|js|jsx|mjs|css|html|vue|svelte|kt|java|swift|py|rs|go)$/ },
  { dir: "scripts", files: /\.(mjs|js|ts|sh|py)$/ },
  { dir: "tests", files: /\.(ts|js|mjs)$/ },
];
const NOT_SOURCE = /(\.test\.[a-z]+|\.d\.ts)$/;
/** Build files at the root, if they exist. */
const ROOT_FILES = ["index.html", "vite.config.ts", "playwright.config.ts"];

/** The files the wiki must describe: all source files, scripts and test helpers, and the root build files. */
const mustCover = [
  ...SOURCE.flatMap(({ dir, files }) => walk(dir).filter((f) => files.test(f) && !NOT_SOURCE.test(f))),
  ...ROOT_FILES.filter((f) => existsSync(join(root, f))),
];

// ---- the pages ------------------------------------------------------------------------

const pageNames = readdirSync(wikiDir)
  .filter((f) => f.endsWith(".md"))
  .sort();
const pages = pageNames.map((name) => {
  const text = readFileSync(join(wikiDir, name), "utf8");
  const coversLine = /^> \*\*Covers:\*\*(.*)$/m.exec(text);
  const checkedLine = /^> \*\*Checked against the code:\*\* (\d{4}-\d{2}-\d{2})\s*$/m.exec(text);
  if (!coversLine) fail(`docs/wiki/${name}: no "> **Covers:**" line at the top.`);
  if (!checkedLine) fail(`docs/wiki/${name}: no "> **Checked against the code:** YYYY-MM-DD" line at the top.`);
  const covers = coversLine ? [...coversLine[1].matchAll(/`([^`]+)`/g)].map((m) => m[1]) : [];
  // Code blocks hold examples (the page template), not claims about the code.
  const body = text.replace(/```[\s\S]*?```/g, "");
  return { name, path: `docs/wiki/${name}`, covers, checked: checkedLine?.[1] ?? null, body };
});

// ---- 1, 2: covered files ------------------------------------------------------------------

const coveredBy = new Map();
for (const page of pages) {
  for (const file of page.covers) {
    if (!existsSync(join(root, file))) fail(`${page.path}: covers ${file}, which doesn't exist (renamed or deleted?).`);
    coveredBy.set(file, [...(coveredBy.get(file) ?? []), page]);
  }
}
for (const file of mustCover) {
  if (!coveredBy.has(file)) fail(`${file} isn't covered by any wiki page: describe it, and add it to that page's Covers line.`);
}

// ---- 2, 3: links and code names --------------------------------------------------------

for (const page of pages) {
  for (const m of page.body.matchAll(/\[([^\]]*)\]\(([^)\s]+)\)/g)) {
    const [, label, href] = m;
    if (/^[a-z]+:/i.test(href) || href.startsWith("#")) continue; // web links and anchors
    const target = resolve(wikiDir, href.split("#")[0]);
    if (!existsSync(target)) {
      fail(`${page.path}: links to ${href}, which doesn't exist.`);
      continue;
    }
    const name = /^`([A-Za-z_$][\w$]*)`$/.exec(label)?.[1];
    if (name && statSync(target).isFile() && !new RegExp(`\\b${name.replace("$", "\\$")}\\b`).test(readFileSync(target, "utf8"))) {
      fail(`${page.path}: names \`${name}\`, which no longer appears in ${rel(target)}.`);
    }
  }
}

// ---- 4: decisions and open questions -----------------------------------------------------

const coms = readFileSync(join(root, "COMS.md"), "utf8");
const section = (title) => coms.split(/^## /m).find((s) => s.startsWith(title)) ?? "";
const decisions = new Set([...section("Decisions made").matchAll(/^\| (\d+) \|/gm)].map((m) => m[1]));
const questions = new Set([...section("Open questions").matchAll(/^(\d+)\. /gm)].map((m) => m[1]));
const numbersIn = (list) => list.match(/\d+/g) ?? [];
for (const page of pages) {
  for (const m of page.body.matchAll(/\bdecisions? (\d+(?:(?:, | and | or | to )\d+)*)/gi)) {
    for (const n of numbersIn(m[1])) if (!decisions.has(n)) fail(`${page.path}: mentions decision ${n}, which isn't in COMS.md.`);
  }
  for (const m of page.body.matchAll(/\bopen questions? (\d+(?:(?:, | and | or )\d+)*)/gi)) {
    for (const n of numbersIn(m[1])) if (!questions.has(n)) fail(`${page.path}: mentions open question ${n}, which isn't in COMS.md.`);
  }
}

// ---- 7: home page, counts, unverified ------------------------------------------------------

const home = pages.find((p) => p.name === "README.md");
if (!home) fail("docs/wiki/README.md (the home page) is missing.");
for (const page of pages) {
  if (home && page !== home && !home.body.includes(`](${page.name})`)) fail(`${page.path} isn't linked from the home page (docs/wiki/README.md).`);
  if (/\b\d[\d,]*\s+(?:core |whole-app |unit |end-to-end |e2e )?tests?\b/i.test(page.body)) {
    fail(`${page.path}: gives a number of tests. Counts go stale: say where to find them instead.`);
  }
  if (/(^|[.!?]\s+|^\s*[-*>]\s+)Unverified:/m.test(page.body)) fail(`${page.path}: still has an "Unverified:" statement. Check it against the code, then remove the word.`);
}

// ---- 5, 6: pages kept up with the code -------------------------------------------------------

const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
let gitWorks = true;
try {
  git("rev-parse", "--is-inside-work-tree");
} catch {
  gitWorks = false;
}
if (gitWorks) {
  // Uncommitted changes (staged, unstaged and new files).
  const changed = new Set(
    git("status", "--porcelain", "--untracked-files=all")
      .split("\n")
      .filter(Boolean)
      .map((line) => line.slice(3).split(" -> ").pop().replace(/^"|"$/g, "")),
  );
  for (const [file, covering] of coveredBy) {
    if (changed.has(file) && !covering.some((p) => changed.has(p.path))) {
      const names = covering.map((p) => p.path).join(" or ");
      fail(`${file} has changed, but ${names} hasn't. Re-read the code, update the page, and set its "Checked against the code" date.`);
    }
  }
  // Committed changes after a page was last checked: later than the page's own last commit, and
  // than its Checked date (a day's leeway, for time zones). A new repository made from a template
  // has everything in one commit, so nothing is stale there.
  const DAY = 24 * 60 * 60 * 1000;
  const lastCommit = (path) => {
    const [time, day] = git("log", "-1", "--format=%ct %cs", "--", path).trim().split(" ");
    return time ? { time: Number(time), day } : null;
  };
  for (const page of pages) {
    if (!page.checked) continue;
    const checked = Date.parse(page.checked);
    const pageCommit = lastCommit(page.path);
    for (const file of page.covers) {
      if (!existsSync(join(root, file))) continue;
      const fileCommit = lastCommit(file);
      if (!fileCommit || (pageCommit && fileCommit.time <= pageCommit.time)) continue;
      if (Date.parse(fileCommit.day) > checked + DAY) {
        fail(`${page.path} was last checked ${page.checked}, but ${file} changed on ${fileCommit.day}. Re-read it against the code and update its date.`);
      }
    }
  }
}

if (problems.size > 0) {
  console.error(`The wiki doesn't match the code (${problems.size} problem${problems.size === 1 ? "" : "s"}):`);
  for (const p of problems) console.error(`  - ${p}`);
  console.error("See docs/wiki/editing-the-wiki.md.");
  process.exit(1);
}
console.log(
  `Wiki matches the code: ${pages.length} pages, ${mustCover.length} files covered.${gitWorks ? "" : " (git not found: skipped the freshness checks)"}`,
);
