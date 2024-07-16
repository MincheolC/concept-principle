/**
 * 문자열 연결을 반복적으로 수행하면 새로운 문자열이 계속 생성되어 메모리 사용량이 증가하고 성능이 떨어집니다.
 * 배열을 사용하여 문자열을 연결한 후 한 번에 조인하면 성능이 향상됩니다.
 *
 * Result
 * - 직접 문자열 연결 실행 시간: 4.64 ms
 * - 직접 문자열 연결 메모리 사용량: 3.072296142578125 MB
 * - 배열 조인 실행 시간: 1.96 ms
 * - 배열 조인 메모리 사용량: 1.2202529907226562 MBs
 */

const { performance } = require("perf_hooks");

// 성능 측정 함수
function measurePerformance(label, fn) {
  const startMemory = process.memoryUsage().heapUsed;
  const start = performance.now();
  fn();
  const end = performance.now();
  const endMemory = process.memoryUsage().heapUsed;
  console.log(`${label} 실행 시간: ${(end - start).toFixed(2)} ms`);
  console.log(`${label} 메모리 사용량: ${(endMemory - startMemory) / 1024 / 1024} MB`);
}

// 직접 문자열 연결
measurePerformance("직접 문자열 연결", () => {
  let result = "";
  for (let i = 0; i < 100000; i++) {
    result += "a";
  }
});

// 배열에 문자열을 추가한 후 조인
measurePerformance("배열 조인", () => {
  let resultArray = [];
  for (let i = 0; i < 100000; i++) {
    resultArray.push("a");
  }
  let resultString = resultArray.join("");
});
