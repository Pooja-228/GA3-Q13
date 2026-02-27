const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [25,26,27,28,29,30,31,32,33,34];
  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`; // replace with actual URLs
    await page.goto(url);

    // Extract all numbers from all tables
    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.textContent.trim())).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b) => a+b, 0);
    console.log(`Seed ${seed} sum:`, sum);
    totalSum += sum;
  }

  console.log('Total sum across all seeds:', totalSum);

  await browser.close();
})();
