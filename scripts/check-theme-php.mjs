/**
 * Static guard for the theme's PHP.
 *
 * A theme can hard-fatal a WordPress site in exactly one easy way: register a
 * hook callback by name that does not exist. add_action()/add_filter() accept
 * any string, and the crash only happens later, when the hook fires. That is
 * what took the site down with:
 *
 *   Uncaught TypeError: call_user_func_array(): Argument #1 ($callback) must
 *   be a valid callback, function "wp_robots_no_robots_unless_public" not found
 *
 * So every string callback must either be defined in the theme itself or appear
 * in CORE_CALLBACKS below — a deliberately tiny list of WordPress functions
 * confirmed to exist. Anything else fails the build.
 */
import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const tpl = resolve(import.meta.dirname, "..", "wordpress");

/** WordPress core callbacks this theme is allowed to reference by name. */
const CORE_CALLBACKS = new Set([
  "__return_false",
  "__return_true",
  "__return_null",
  "__return_zero",
  "__return_empty_array",
  "__return_empty_string",
]);

const files = (await readdir(tpl)).filter((f) => f.endsWith(".php"));

let defined = new Set();
const sources = {};
for (const f of files) {
  const src = await readFile(join(tpl, f), "utf8");
  sources[f] = src;
  for (const m of src.matchAll(/^\s*function\s+([A-Za-z_]\w*)\s*\(/gm)) {
    defined.add(m[1]);
  }
}

const problems = [];
for (const [file, src] of Object.entries(sources)) {
  const lines = src.split("\n");
  lines.forEach((line, i) => {
    // add_action( 'hook', 'callback' ) / add_filter( 'hook', 'callback' )
    const m = line.match(
      /\badd_(?:action|filter)\s*\(\s*(['"])[^'"]+\1\s*,\s*(['"])([A-Za-z_]\w*)\2/
    );
    if (!m) return;
    const cb = m[3];
    if (defined.has(cb) || CORE_CALLBACKS.has(cb)) return;
    problems.push(
      `${file}:${i + 1}  callback "${cb}" is neither defined in the theme ` +
        `nor an approved core function`
    );
  });
}

if (problems.length) {
  console.error("\n  Theme PHP check FAILED:\n");
  for (const p of problems) console.error("    " + p);
  console.error(
    "\n  Define the function in the theme, or add it to CORE_CALLBACKS in" +
      "\n  scripts/check-theme-php.mjs once you have confirmed it exists.\n"
  );
  process.exit(1);
}

// Cheap structural sanity on top: balanced braces, no stray closing tag.
for (const [file, src] of Object.entries(sources)) {
  const code = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  const open = (code.match(/\{/g) || []).length;
  const close = (code.match(/\}/g) || []).length;
  if (open !== close) {
    console.error(`\n  ${file}: unbalanced braces (${open} { vs ${close} })\n`);
    process.exit(1);
  }
}

console.log(
  `  PHP check: ${files.length} files, ${defined.size} theme functions, ` +
    `all hook callbacks resolve.`
);
