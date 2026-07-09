// Refresh the live-site screenshots in public/sites/.
// Usage: npm run capture  (requires: npx playwright install chromium)
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "public", "sites");

const sites = [
  ["syncode", "https://www.teamsyncode.com/"],
  ["chinalanka", "https://www.chinalankamotors.com/"],
  ["jayasvictory", "https://www.jayasvictorytravels.com/"],
  ["unicare", "https://www.unicareconnect.com/"],
  ["wasantha", "https://wasantha-construction.vercel.app/"],
  ["itsc", "https://itsc-website-design.vercel.app/"],
  ["rehob", "https://rehob-edm-platform.vercel.app/"],
  ["maisonashri", "https://maisonashri.vercel.app/"],
];

fs.mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
});

for (const [slug, url] of sites) {
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  } catch {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  }
  await page.waitForTimeout(3500); // let hero animations settle
  const file = path.join(outDir, `${slug}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 72 });
  console.log(`${slug}: ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
  await page.close();
}

await browser.close();
