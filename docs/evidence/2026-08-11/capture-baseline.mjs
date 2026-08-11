import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;
const shotDir = path.join(root, 'screenshots');
const axeDir = path.join(root, 'axe');
const kbDir = path.join(root, 'keyboard');
const crawlDir = path.join(root, 'crawl');

for (const d of [shotDir, axeDir, kbDir]) fs.mkdirSync(d, { recursive: true });

const viewports = [
  { name: '360x800', width: 360, height: 800 },
  { name: '768x1024', width: 768, height: 1024 },
  { name: '1440x900', width: 1440, height: 900 },
  { name: '1920x1080', width: 1920, height: 1080 },
];

const routes = [
  { id: 'home', url: 'https://clarky3d.com/', wait: 'text=Clarky' },
  { id: 'colours', url: 'https://clarky3d.com/', action: 'colours' },
  { id: 'product-featured', url: 'https://clarky3d.com/?p=Retro_Gaming/Snes/Cart_Slide_Out_Drawer' },
  { id: 'product-popular', url: 'https://clarky3d.com/?p=Vial_Storage/3ml_Cases/Base_Case' },
  { id: 'product-priced', url: 'https://clarky3d.com/?p=Hotwheels/Display_Racks/5x1_Rack' },
  { id: 'category-vial', url: 'https://clarky3d.com/', action: 'category-vial' },
  { id: 'admin', url: 'https://clarky3d.com/admin', wait: 'body' },
];

async function settle(page) {
  await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(800);
}

async function openColours(page) {
  const btn = page.getByRole('button', { name: /colour|color|filament/i }).first();
  if (await btn.count()) {
    await btn.click();
  } else {
    const link = page.getByRole('link', { name: /colour|color|filament/i }).first();
    if (await link.count()) await link.click();
    else {
      await page.evaluate(() => {
        const nodes = [...document.querySelectorAll('button,a,[role="button"]')];
        const el = nodes.find((n) => /colour|color|filament/i.test(n.textContent || ''));
        el?.click();
      });
    }
  }
  await settle(page);
}

async function openCategory(page, label) {
  await page.evaluate((lab) => {
    const nodes = [...document.querySelectorAll('a,button,[role="button"]')];
    const el = nodes.find((n) => (n.textContent || '').toLowerCase().includes(lab));
    el?.click();
  }, label);
  await settle(page);
}

async function openCart(page) {
  const btn = page.locator('.cart-btn, button:has-text("Cart"), [aria-label*="cart" i]').first();
  if (await btn.count()) {
    await btn.click();
    await settle(page);
    return true;
  }
  return false;
}

async function captureDomInventory(page, id) {
  return page.evaluate((pageId) => {
    const text = (el) => (el?.innerText || el?.textContent || '').trim().replace(/\s+/g, ' ');
    const meta = (name) => document.querySelector(`meta[name="${name}"]`)?.content || null;
    const prop = (name) => document.querySelector(`meta[property="${name}"]`)?.content || null;
    const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({
      tag: h.tagName.toLowerCase(),
      text: text(h).slice(0, 200),
    }));
    const landmarks = [...document.querySelectorAll('header,nav,main,footer,aside,[role]')].map((el) => ({
      tag: el.tagName.toLowerCase(),
      role: el.getAttribute('role'),
      name: el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || null,
    }));
    const links = [...document.querySelectorAll('a[href]')].map((a) => ({
      href: a.getAttribute('href'),
      text: text(a).slice(0, 120),
    }));
    const buttons = [...document.querySelectorAll('button,[role="button"]')].map((b) => ({
      text: text(b).slice(0, 120),
      aria: b.getAttribute('aria-label'),
      disabled: b.hasAttribute('disabled') || b.getAttribute('aria-disabled') === 'true',
    }));
    const forms = [...document.querySelectorAll('form')].map((f) => ({
      action: f.getAttribute('action'),
      method: f.getAttribute('method'),
      fields: [...f.querySelectorAll('input,select,textarea')].map((i) => ({
        tag: i.tagName.toLowerCase(),
        type: i.getAttribute('type'),
        name: i.getAttribute('name'),
        id: i.id,
        label: i.labels?.[0] ? text(i.labels[0]) : null,
        required: i.required,
      })),
    }));
    const images = [...document.querySelectorAll('img')].map((img) => ({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt'),
      w: img.naturalWidth,
      h: img.naturalHeight,
    }));
    const overflowX = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    return {
      pageId,
      url: location.href,
      title: document.title,
      lang: document.documentElement.lang,
      description: meta('description'),
      robots: meta('robots'),
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      ogTitle: prop('og:title'),
      ogUrl: prop('og:url'),
      ogImage: prop('og:image'),
      headings,
      landmarks: landmarks.slice(0, 80),
      linkCount: links.length,
      links: links.slice(0, 80),
      buttons: buttons.slice(0, 80),
      forms,
      images: images.slice(0, 40),
      bodyTextSample: text(document.body).slice(0, 1200),
      overflowX,
      rootChildren: document.getElementById('root')?.childElementCount ?? null,
    };
  }, id);
}

async function keyboardProbe(page) {
  const notes = [];
  await page.keyboard.press('Tab');
  await page.waitForTimeout(100);
  let focused = await page.evaluate(() => {
    const el = document.activeElement;
    return {
      tag: el?.tagName,
      text: (el?.innerText || el?.textContent || '').trim().slice(0, 80),
      className: el?.className,
      href: el?.getAttribute?.('href'),
      role: el?.getAttribute?.('role'),
    };
  });
  notes.push({ step: 'first-tab', focused });
  const skipWorked = /skip/i.test(focused?.text || '') || /skip/i.test(focused?.className || '');
  notes.push({ step: 'skip-link-present-on-first-tab', result: skipWorked });

  const focusOrder = [];
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(50);
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      const r = el?.getBoundingClientRect?.();
      const style = el ? getComputedStyle(el) : null;
      return {
        tag: el?.tagName,
        text: (el?.innerText || el?.textContent || el?.getAttribute?.('aria-label') || '').trim().slice(0, 80),
        outline: style?.outline,
        boxShadow: style?.boxShadow,
        visible: !!(r && r.width + r.height > 0),
      };
    });
    focusOrder.push(info);
  }
  notes.push({ step: 'focus-order-sample', focusOrder });
  const visibleFocusCount = focusOrder.filter((f) => f.visible && f.outline && f.outline !== 'none').length;
  notes.push({ step: 'visible-focus-count-estimate', visibleFocusCount });
  return notes;
}

async function prepareRoute(page, route) {
  await page.goto(route.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await settle(page);
  if (route.action === 'colours') await openColours(page);
  if (route.action === 'category-vial') await openCategory(page, 'pep');
  if (route.wait && route.wait.startsWith('text=')) {
    await page.getByText(route.wait.slice(5), { exact: false }).first().waitFor({ timeout: 15000 }).catch(() => {});
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const summary = { capturedAt: new Date().toISOString(), routes: [], keyboard: {}, axe: {}, responsive: {} };

  for (const route of routes) {
    const routeSummary = { id: route.id, url: route.url, screenshots: [], inventories: {} };
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      try {
        await prepareRoute(page, route);
        const file = `${route.id}--${vp.name}.png`;
        await page.screenshot({ path: path.join(shotDir, file), fullPage: true });
        routeSummary.screenshots.push(file);
        const inv = await captureDomInventory(page, `${route.id}-${vp.name}`);
        routeSummary.inventories[vp.name] = inv;
        fs.writeFileSync(path.join(crawlDir, `dom-${route.id}-${vp.name}.json`), JSON.stringify(inv, null, 2));
        summary.responsive[`${route.id}-${vp.name}`] = { overflowX: inv.overflowX, title: inv.title };
      } catch (err) {
        routeSummary.errors = routeSummary.errors || [];
        routeSummary.errors.push({ viewport: vp.name, message: String(err) });
      }
      await context.close();
    }

    const axeContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const axePage = await axeContext.newPage();
    try {
      await prepareRoute(axePage, route);
      const axe = await new AxeBuilder({ page: axePage }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      const compact = {
        url: axe.url,
        violations: axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          helpUrl: v.helpUrl,
          nodes: v.nodes.slice(0, 10).map((n) => ({
            target: n.target,
            failureSummary: n.failureSummary,
            html: n.html?.slice(0, 300),
          })),
        })),
        passes: axe.passes.length,
        incomplete: axe.incomplete.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
      };
      fs.writeFileSync(path.join(axeDir, `${route.id}.json`), JSON.stringify(compact, null, 2));
      summary.axe[route.id] = {
        violationCount: compact.violations.length,
        impacts: compact.violations.map((v) => `${v.impact}:${v.id}`),
      };
    } catch (err) {
      summary.axe[route.id] = { error: String(err) };
    }
    await axeContext.close();

    if (route.id === 'home') {
      const kbContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const kbPage = await kbContext.newPage();
      await prepareRoute(kbPage, route);
      const kb = await keyboardProbe(kbPage);
      fs.writeFileSync(path.join(kbDir, 'home-keyboard.json'), JSON.stringify(kb, null, 2));
      summary.keyboard.home = kb.map((n) => n.step);
      await kbContext.close();
    }

    if (route.id === 'product-featured') {
      const cartContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const cartPage = await cartContext.newPage();
      try {
        await prepareRoute(cartPage, route);
        await cartPage.evaluate(() => {
          const buttons = [...document.querySelectorAll('button')];
          const add = buttons.find((b) => /add/i.test(b.textContent || ''));
          add?.click();
        });
        await settle(cartPage);
        await openCart(cartPage);
        await cartPage.screenshot({ path: path.join(shotDir, 'cart-open--1440x900.png'), fullPage: true });
        const emptyAdd = await cartPage.evaluate(() => {
          const order = [...document.querySelectorAll('a,button')].find((b) => /order|telegram/i.test(b.textContent || ''));
          return {
            orderHref: order?.getAttribute?.('href') || null,
            orderText: (order?.textContent || '').trim().slice(0, 120),
            cartText: (document.body.innerText || '').slice(0, 1500),
          };
        });
        fs.writeFileSync(path.join(crawlDir, 'cart-state.json'), JSON.stringify(emptyAdd, null, 2));
        routeSummary.cart = emptyAdd;
      } catch (err) {
        routeSummary.cartError = String(err);
      }
      await cartContext.close();
    }

    summary.routes.push(routeSummary);
  }

  const unknownContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const unknownPage = await unknownContext.newPage();
  await unknownPage.goto('https://clarky3d.com/?p=Does_Not_Exist/Thing', { waitUntil: 'domcontentloaded' });
  await settle(unknownPage);
  await unknownPage.screenshot({ path: path.join(shotDir, 'unknown-product--1440x900.png'), fullPage: true });
  const unknownInv = await captureDomInventory(unknownPage, 'unknown-product');
  fs.writeFileSync(path.join(crawlDir, 'dom-unknown-product.json'), JSON.stringify(unknownInv, null, 2));
  await unknownContext.close();

  fs.writeFileSync(path.join(root, 'capture-summary.json'), JSON.stringify(summary, null, 2));
  await browser.close();
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
