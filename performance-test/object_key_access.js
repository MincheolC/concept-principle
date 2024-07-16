/**
 * for...in 루프에서 hasOwnProperty 체크를 피하기 위해 Object.keys 메서드를 사용하여 성능을 개선
 *
 * Result
 * - Object.keys 반복 접근 실행 시간: 14.27 ms
 * - for...in 루프 실행 시간: 16.78 ms
 */

const { performance } = require("perf_hooks");

// 성능 측정 함수
function measurePerformance(label, fn) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${label} 실행 시간: ${(end - start).toFixed(2)} ms`);
}

// 큰 객체 생성
const obj = {};
for (let i = 0; i < 100000; i++) {
  obj[`key${i}`] = i;
}

// 객체의 키에 반복적으로 접근
measurePerformance("Object.keys 반복 접근", () => {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const value = obj[keys[i]];
  }
});

// for...in 루프를 사용한 접근
measurePerformance("for...in 루프", () => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
    }
  }
});
