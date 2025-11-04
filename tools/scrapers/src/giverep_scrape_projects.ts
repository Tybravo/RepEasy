// giverep_scrape_playwright.js
import { chromium } from "playwright";
import path from 'path';
import fs from "fs";
import { fileURLToPath } from 'url'; // Import fileURLToPath

const LIST_URL = 'https://giverep.com/mindshare';
const OUTPUT_JSON = 'output/giverep_projects.json';

// Get the directory name using import.meta.url for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, 'images');

if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

function safeFilename(name: string | null): string {
  return name ? name.replace(/[^a-z0-9_\-\.]/gi, '_').toLowerCase() : 'unknown';
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'GiveRep-Scraper/1.0'
  });
  const page = await context.newPage();

  console.log('Opening list page:', LIST_URL);
  await page.goto(LIST_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });

  // Wait longer for all projects to render
  await page.waitForTimeout(8000);


  const CARD_SELECTOR = 'div[class*="col-span-1"]';
  const cardsCount = await page.$$eval(CARD_SELECTOR, els => els.length);
  console.log(`Detected ${cardsCount} project cards.`);

  if (cardsCount === 0) {
    console.warn("⚠️ No projects detected. Check selector or increase wait time.");
  }

  const projects = await page.$$eval(CARD_SELECTOR, (cards) => {
  return cards.map(card => {
    // Extract name and link
    const nameEl = card.querySelector('h3, h2, p, span, div.font-bold, .text-lg');
    const linkEl = card.querySelector('a[href]');
    const name = nameEl ? nameEl.textContent.trim() : null;
     const href = linkEl ? (linkEl as HTMLAnchorElement).href : null;

    // Find all images in the card
    const imgEls = Array.from(card.querySelectorAll('img'));
    let icon = null;
    let banner = null;

    imgEls.forEach(img => {
      const cls = img.className || '';
      if (cls.includes('h-full w-full object-cover')) {
        // this one usually matches the profile icon
        icon = img.src;
      } else if (cls.includes('w-full h-full object-cover')) {
        // this one usually matches the banner
        banner = img.src;
      }
    });

    // Fallback if we find only one image
    if (!icon && imgEls.length > 0) icon = imgEls[0].src;

    return { name, href, icon, banner };
  });
});


  // Optional: filter out nulls or duplicates
  const unique = [];
  const seen = new Set();
  for (const proj of projects) {
    if (!proj.name || seen.has(proj.name)) continue;
    seen.add(proj.name);
    unique.push(proj);
  }

  console.log(`✅ Extracted ${unique.length} unique projects.`);

  // Save as JSON
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(unique, null, 2), 'utf-8');
  console.log(`Saved to ${OUTPUT_JSON}`);

  await browser.close();
})();
