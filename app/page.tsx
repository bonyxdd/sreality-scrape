import puppeteer, { Browser, Page } from 'puppeteer';
import { Client } from 'pg';
import App from './propertyComp';

async function database(title: string, url: string): Promise<void> {
  const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'root',
    database: 'sreality',
  });
  
  await client.connect();
  
  try {
    await client.query('INSERT INTO property (title, url) VALUES ($1, $2)', [title, url]);
    console.log('Inserted successfully into the database.');
  } catch (err) {
    console.error('Error inserting into the database:', err);
  } finally {
    await client.end();
  }
}

const main = async (): Promise<void> => {
  const browser: Browser = await puppeteer.launch();
  const page: Page = await browser.newPage();
  for (let index = 1; index < 26 ; index++) {
    await page.goto('https://www.sreality.cz/en/search/for-sale/apartments?page=' + index);
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
    for (const property of allProperties) {
      await database(property.title, property.url);
    }
  }
  await browser.close();
};

const fetchData = async () => {
  const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'root',
    database: 'sreality',
  });

  await client.connect();

  try {
    const res = await client.query('SELECT id, title, url FROM property');
    const fetchedProperties: PropertyProps[] = res.rows as PropertyProps[];
    
    const propTitles = fetchedProperties.map((property) => property.title);
    const propUrls = fetchedProperties.map((property) => property.url);
    let components = [];
        return (
          <div className="wrapper">
              <App titles={propTitles} urls={propUrls} />
          </div>
          )
      } catch (err) {
        console.error('Error selecting from the database:', err);
    }
}

type PropertyProps = {
  title: string;
  url: string;
};

export default fetchData;

//main();
fetchData();