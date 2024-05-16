function transform(follower) {
  const [id, description, _] = follower;
  return {
    id,
    url: `https://www.instagram.com/${id}/`,
    description,
  };
}

export async function pickAllFollowerIds(page, selector) {
  const followers = await page.evaluate((sel) => {
    const getDivDepth = (element) => {
      let current = element;
      let level = 0;

      // 상위 div를 따라 올라가며 계층 깊이 계산
      while (current && current.nodeName === "DIV") {
        current = current.parentElement;
        if (current && current.nodeName === "DIV") {
          level++;
        }
      }
      return level;
    };

    const rootElement = document.querySelector(sel);
    if (!rootElement) {
      console.warn(`No element matches selector: ${sel}`);
      return [];
    }

    // selector 하위의 모든 div를 가져옴
    const followerElements = Array.from(rootElement.querySelectorAll("div"));

    // div들 중에 <html> 태그로 부터 16 depth에 해당되는 div들만 추출 (FIXME: 인스타 Follower UI 변경되면 맞춰서 수정되어야 함)
    const filteredElements = followerElements.filter((div) => getDivDepth(div) === 17);

    console.log(followerElements.length, filteredElements.length);

    // followers 순회하며 각 div의 모든 텍스트 추출하기
    const extractedTexts = filteredElements.map((follower) => {
      // 해당 div의 모든 텍스트 수집
      const textContent = [];

      // 하위 노드를 순회하며 텍스트 노드만 추출
      function traverseNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent.trim();
          if (text.length > 0) {
            textContent.push(text);
          }
        }
        node.childNodes.forEach(traverseNodes);
      }

      traverseNodes(follower);

      // 텍스트 조합 및 반환
      return textContent;
    });
    return extractedTexts;
  }, selector);
  return followers.map(transform);
}
