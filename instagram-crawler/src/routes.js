import { createPlaywrightRouter, sleep } from "crawlee";

export const router = createPlaywrightRouter();

async function handleDivInfiniteScroll(page, selector) {
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

    await page.waitForTimeout(3000); // 로드를 기다리는 시간 (적절하게 조정)

    const currentHeight = await page.evaluate((sel) => {
      const scrollableDiv = document.querySelector(sel);
      return scrollableDiv.scrollHeight;
    }, selector);

    if (currentHeight === previousHeight || scorllCount > 5) {
      break; // 더 이상 스크롤할 내용이 없으면 반복 중단
    }

    scorllCount += 1;
  }
}

// 로그인 페이지 핸들러 추가
router.addDefaultHandler(async ({ page, log }) => {
  log.info("Accessing the login page");

  // 로그인 페이지 URL
  //   const loginUrl = "https://instagram.com";

  // 이메일 입력 필드 찾기 및 입력
  //   await page.fill('input[id="email"]', process.env.ID); // 여기에 실제 이메일을 입력하세요.
  await page.fill('input[name="username"]', process.env.ID); // 여기에 실제 이메일을 입력하세요.
  await sleep(2000);
  // 비밀번호 입력 필드 찾기 및 입력
  //   await page.fill('input[id="password"]', process.env.PASSWORD); // 여기에 실제 비밀번호를 입력하세요.
  await page.fill('input[name="password"]', process.env.PASSWORD); // 여기에 실제 비밀번호를 입력하세요.

  await sleep(2000);
  // 로그인 버튼 클릭
  await page.click('button[type="submit"]');

  // 로그인 후의 페이지 상태 확인
  //   await page.waitForURL("http://localhost:3000/dashboard");
  await page.waitForURL("https://www.instagram.com/");
  await sleep(5000);

  const specificUserUrl = `https://instagram.com/${process.env.INSTAGRAM_USER_ID}`;
  //   const specificUserUrl = "http://localhost:3000/dashboard/my-material";

  await page.goto(specificUserUrl);

  await sleep(3000);
  // 팔로워 링크 클릭
  await page.click("text=팔로워");
  await sleep(4000);
  const selector = "div._aano";
  await handleDivInfiniteScroll(page, selector);

  //   // TEST
  //   await page.fill('input[placeholder="검색"]', "봉강");
  //   await sleep(1000);
  //   await page.click("text=검색");
  //   await sleep(2000);

  //   const selector = "div.overflow-auto.relative";
  //   await handleDivInfiniteScroll(page, selector);

  await sleep(3000);
});
