import dotenv from "dotenv";
dotenv.config();

import { chromium } from "playwright";
import path from "path";
import { pickAllFollowerIds } from "../src/parser.js";
import { saveJsonToFile } from "../src/data.js";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // HTML 콘텐츠 직접 주입
  // 로컬 HTML 파일 경로
  const localHtmlPath = path.resolve(`./output/${process.env.INSTAGRAM_USER_ID}_followers.html`);

  // file:// URL을 사용해 로컬 파일 로드
  await page.goto(`file://${localHtmlPath}`);

  // 페이지 상호작용 예시
  const selector = "div._aano";
  const followers = await pickAllFollowerIds(page, selector);

  saveJsonToFile(followers, `${process.env.INSTAGRAM_USER_ID}_followers.json`);
  saveJsonToFile(
    followers.map((follower) => follower.url),
    `${process.env.INSTAGRAM_USER_ID}_followers_url.json`
  );
  await browser.close();
})();
