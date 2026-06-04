const { join } = require('path');

/**
 * Keep Puppeteer's downloaded Chromium inside the project so that the version
 * fetched during `npm install` is found again by `puppeteer.launch()` during
 * the build prerender step (scripts/prerender.mjs) — important on Vercel.
 * Locally we skip the download and point PUPPETEER_EXECUTABLE_PATH at an
 * existing browser instead.
 */
module.exports = {
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
