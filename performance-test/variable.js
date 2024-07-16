/**
 * 배열의 길이를 반복적으로 계산하는 대신, 변수에 저장하여 접근 속도를 높입니다.
 *
 * Result
 * Length in Loop: 1.276ms
 * Length in Variable: 0.737ms
 */

const array = Array.from({ length: 1000000 }, (_, i) => i);

// Measure time for accessing array length within the loop
console.time("Length in Loop");
for (let i = 0; i < array.length; i++) {
  // No operation
}
console.timeEnd("Length in Loop");

// Measure time for storing array length in a variable before the loop
console.time("Length in Variable");
const length = array.length;
for (let i = 0; i < length; i++) {
  // No operation
}
console.timeEnd("Length in Variable");
