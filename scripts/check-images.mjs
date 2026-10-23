// Flags images that are too heavy for the web.
//   node scripts/check-images.mjs                 checks everything in public/images
//   node scripts/check-images.mjs a.jpg b.png     checks just these files
// Exits 1 and prints one line per oversized image. Writes a Markdown report to
// $REPORT_FILE when set (used by the GitHub workflow).
import sharp from "sharp";
import { readdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";

export const MAX_KB = 600;
export const MAX_WIDTH = 2400;
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));

const files = (process.argv.length > 2 ? process.argv.slice(2) : walk("public/images")).filter(
  (f) => existsSync(f) && EXTENSIONS.has(extname(f).toLowerCase()),
);

const problems = [];
for (const file of files) {
  const kb = Math.round(statSync(file).size / 1024);
  const { width = 0, height = 0 } = await sharp(file).metadata().catch(() => ({}));
  const reasons = [];
  if (kb > MAX_KB) reasons.push(`${kb.toLocaleString("en-US")} KB (limit ${MAX_KB} KB)`);
  if (width > MAX_WIDTH) reasons.push(`${width}×${height} px (limit ${MAX_WIDTH} px wide)`);
  if (reasons.length) problems.push({ file, reasons });
}

for (const p of problems) console.log(`::warning file=${p.file}::Image too big: ${p.reasons.join(", ")}`);
console.log(`Checked ${files.length} image(s); ${problems.length} too big.`);

if (process.env.REPORT_FILE && problems.length) {
  writeFileSync(
    process.env.REPORT_FILE,
    [
      `These images are bigger than the site needs, so they'll make pages slow to load:`,
      ``,
      ...problems.map((p) => `- \`${p.file}\`: ${p.reasons.join(", ")}`),
      ``,
      `**How to fix:** shrink them to at most ${MAX_WIDTH} px wide and under ${MAX_KB} KB, then upload the smaller version in Pages CMS with the same file name, so posts that use it keep working. A free tool like https://squoosh.app works well (MozJPEG for photos, OxiPNG for charts, quality around 80). Or ask Claude to shrink them for you.`,
      ``,
      `Close this issue once they're fixed.`,
    ].join("\n"),
  );
}

process.exit(problems.length ? 1 : 0);
