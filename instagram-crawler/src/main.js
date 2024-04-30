import dotenv from "dotenv";
dotenv.config();

import { PlaywrightCrawler, ProxyConfiguration } from "crawlee";
import { router } from "./routes.js";

const startUrls = ["https://instagram.com"];
// const startUrls = ["http://localhost:3000/login"];

const crawler = new PlaywrightCrawler({
  // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] }),
  requestHandler: router,
  // Comment this option to scrape the full website.
  maxRequestsPerCrawl: 1,
  launchContext: {
    useChrome: true,
    launchOptions: {
      headless: false,
    },
  },
});

await crawler.run(startUrls);
