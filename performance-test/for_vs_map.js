/**
 * 어떤 방식이 더 빠를지는 실제 작업의 복잡도와 JavaScript 엔진의 최적화 수준에 따라 달라질 수 있음.
 * => 성능이 정말 중요할 때는 스트레스 테스트 해보면서 개선해야 함. 그 외는 가독성 (승)
 *
 * Result
 * - 전통적인 for 루프 실행 시간: 79.07 ms
 * - map 메서드 실행 시간: 105.56 ms
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

// 복잡한 작업 함수
function complexCalculation(value) {
  let result = 0;
  for (let i = 0; i < 100; i++) {
    result += Math.sqrt(value + i);
  }
  return result;
}

// 전통적인 for 루프
measurePerformance("전통적인 for 루프", () => {
  const results = [];
  for (let i = 0; i < array.length; i++) {
    results.push(complexCalculation(array[i]));
  }
});

// map 메서드
measurePerformance("map 메서드", () => {
  const results = array.map(complexCalculation);
});
