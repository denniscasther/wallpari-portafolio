const path = require('path');
const puppeteer = require('../../wallpari-instagram-agent/node_modules/puppeteer');

const targets = [
  ['https://coach.wallpari.pe', 'coach-idiomas.png'],
  ['https://pmp.wallpari.pe', 'pmp-simulador.png'],
];

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });
  try {
    for (const [url, filename] of targets) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
      await page.screenshot({ path: path.join(__dirname, '..', 'dist', 'assets', 'img', 'projects', filename) });
      await page.close();
    }
  } finally {
    await browser.close();
  }
})();
