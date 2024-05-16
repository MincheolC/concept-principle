import { createPlaywrightRouter, sleep } from "crawlee";
import { randomMilliSec } from "./util.js";
import { saveJsonToFile, saveToHtml } from "./data.js";

export const router = createPlaywrightRouter();

async function handleDivInfiniteScroll(page, selector, maxScrollCount) {
  let previousHeight;
  let scorllCount = 0;

  while (true) {
    previousHeight = await page.evaluate((sel) => {
      const scrollableDiv = document.querySelector(sel);
      return scrollableDiv.scrollHeight;
    }, selector);

    await page.evaluate((sel) => {
      const scrollableDiv = document.querySelector(sel);
      scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
    }, selector);

    await page.waitForTimeout(randomMilliSec(2800, 3100)); // 로드를 기다리는 시간 (적절하게 조정)

    const currentHeight = await page.evaluate((sel) => {
      const scrollableDiv = document.querySelector(sel);
      return scrollableDiv.scrollHeight;
    }, selector);

    if (currentHeight === previousHeight || scorllCount > maxScrollCount) {
      break; // 더 이상 스크롤할 내용이 없으면 반복 중단
    }

    scorllCount += 1;
  }
}

// 로그인 페이지 핸들러 추가
router.addDefaultHandler(async ({ page, log }) => {
  log.info("Accessing the login page");

  // 이메일 입력 필드 찾기 및 입력
  await page.fill('input[name="username"]', process.env.ID); // 여기에 실제 이메일을 입력하세요.
  await sleep(2000);
  // 비밀번호 입력 필드 찾기 및 입력
  //   await page.fill('input[id="password"]', process.env.PASSWORD); // 여기에 실제 비밀번호를 입력하세요.
  await page.fill('input[name="password"]', process.env.PASSWORD); // 여기에 실제 비밀번호를 입력하세요.

  await sleep(2000);
  // 로그인 버튼 클릭
  await page.click('button[type="submit"]');

  // 로그인 후의 페이지 상태 확인
  await page.waitForURL("https://www.instagram.com/");
  await sleep(5000);

  const specificUserUrl = `https://instagram.com/${process.env.INSTAGRAM_USER_ID}`;
  await page.goto(specificUserUrl);
  await sleep(3000);

  // 팔로워 링크 클릭
  await page.click("text=팔로워");
  await sleep(4000);

  // 팔로워 리스트 최대 12 x maxScrollCount 만큼 불러오기
  const maxScrollCount = process.env.MAX_SCROLL_COUNT;
  const selector = "div._aano";
  await handleDivInfiniteScroll(page, selector, maxScrollCount);
  await sleep(2000);

  const htmlContent = await page.evaluate(() => {
    // 모든 <script> 태그 선택 및 제거
    const scripts = document.querySelectorAll("script");
    scripts.forEach((script) => script.remove());

    // 수정된 HTML 문서를 반환
    return document.documentElement.outerHTML;
  });

  saveToHtml(htmlContent, `${process.env.INSTAGRAM_USER_ID}_followers.html`);

  // const followers = await pickAllFollowerIds(page, selector);
  // await sleep(15000);

  // console.log(followers);
  // saveJsonToFile(followers, "followers.json");
  // saveJsonToFile(
  //   followers.map((follower) => follower.url),
  //   "followers_url.json"
  // );
});
