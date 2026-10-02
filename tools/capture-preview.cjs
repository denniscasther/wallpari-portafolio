const puppeteer = require('../../wallpari-instagram-agent/node_modules/puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });
    await page.screenshot({ path: 'preview-desktop.png', fullPage: true });
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
    await page.reload({ waitUntil: 'networkidle0' });
    await page.screenshot({ path: 'preview-mobile.png', fullPage: true });
    await page.type('#search', 'Python');
    await page.waitForFunction(() => document.querySelector('#results-label').textContent.includes('proyectos'));
    const filtered = await page.$eval('#results-label', (element) => element.textContent);
    if (!filtered.startsWith('3 ')) throw new Error(`Filtro inesperado: ${filtered}`);
  } finally {
    await browser.close();
  }
})();
