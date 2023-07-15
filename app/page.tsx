import puppeteer, { Browser, Page } from 'puppeteer';

const url: string = 'https://www.sreality.cz/en/search/for-sale/apartments?page=';

const main = async (): Promise<void> => {
  const browser: Browser = await puppeteer.launch();
  const page: Page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector('.dir-property-list');
  await page.screenshot({ path: 'screenshot.png', fullPage: true });
  const allProperties: { url: string; title: string }[] = await page.evaluate(() => {
    const properties: NodeListOf<Element> = document.querySelectorAll('.property');
    
    return Array.from(properties)
      .slice(0, 100)
      .map((property: Element) => {
        const url: string = (property.querySelector('img') as HTMLImageElement).src;
        const title: string = (property.querySelector('.title span') as HTMLElement).innerText;
        return { url, title };
      });
  });
  console.log(allProperties);
  await browser.close();
};

main();
