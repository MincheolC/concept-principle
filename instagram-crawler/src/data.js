import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function saveJsonToFile(data, filename) {
  // JSON 형식으로 변환
  const jsonData = JSON.stringify(data, null, 2);

  // 파일 저장 경로 생성 (현재 디렉토리 + 파일명)
  const filePath = path.join(__dirname, "../output", filename);

  // 파일에 쓰기
  fs.writeFileSync(filePath, jsonData, "utf8");
  console.log(`Data saved to file: ${filePath}`);
}

export function saveToHtml(data, filename) {
  const filePath = path.join(__dirname, "../output", filename);
  fs.writeFileSync(filePath, data, "utf8");

  console.log(`Page HTML has been saved to ${filePath}`);
}
