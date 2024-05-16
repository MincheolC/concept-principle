import { sleep } from "crawlee";
import { chromium } from "playwright";
import path from "path";
import { pickAllFollowerIds } from "../src/parser.js";
import { saveJsonToFile } from "../src/data.js";

(async () => {
  const browser = await chromium.launch({
    // headless: false,
  });
  const page = await browser.newPage();

  // HTML 콘텐츠 직접 주입
  // 로컬 HTML 파일 경로
  // const localHtmlPath = path.resolve("./test/test.html");
  const localHtmlPath = path.resolve("./test/test1.html");

  // file:// URL을 사용해 로컬 파일 로드
  await page.goto(`file://${localHtmlPath}`);

  // 페이지 상호작용 예시
  const selector = "div._aano";
  const followers = await pickAllFollowerIds(page, selector);

  // await sleep(60000);

  saveJsonToFile(followers, "followers.json");
  saveJsonToFile(
    followers.map((follower) => follower.url),
    "followers_url.json"
  );
  await browser.close();
})();
