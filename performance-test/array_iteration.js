/**
 *
 *
 * Result
 * - 전통적인 for 루프 실행 시간: 1.85 ms
 * - for...of 루프 실행 시간: 8.38 ms
 * - forEach 메서드 실행 시간: 5.61 ms
 * - map 메서드 실행 시간: 7.33 ms
 */

const { performance } = require("perf_hooks");

// 성능 측정 함수
function measurePerformance(label, fn) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${label} 실행 시간: ${(end - start).toFixed(2)} ms`);
}

// 큰 배열 생성
const array = Array.from({ length: 1000000 }, (_, i) => i);

// 전통적인 for 루프
measurePerformance("전통적인 for 루프", () => {
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const value = array[i];
  }
});

// for...of 루프
measurePerformance("for...of 루프", () => {
  for (const value of array) {
    // No operation
  }
});

// forEach 메서드
measurePerformance("forEach 메서드", () => {
  array.forEach((value) => {
    // No operation
  });
});

// map 메서드
measurePerformance("map 메서드", () => {
  array.map((value) => {
    return value;
  });
});
