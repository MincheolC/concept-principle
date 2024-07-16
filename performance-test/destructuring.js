/**
 * 객체의 프로퍼티에 반복적으로 접근하는 대신, 구조 분해 할당으로 한 번에 접근하여 성능을 향상시킵니다.
 * 성능 차이는 미미할 수 있지만, 구조 분해 할당을 통해 변수로 저장하면 프로퍼티 접근 시 캐시 메모리를 더 효과적으로 사용할 수 있어 성능 개선이 가능할 때도 있음.
 *
 * 결과
 * - Repeated Access: 3.164ms
 * - Destructuring: 1.703ms
 */

const user = { firstName: "John", lastName: "Doe" };

// 반복적 접근
console.time("Repeated Access");
for (let i = 0; i < 1000000; i++) {
  const name = user.firstName + " " + user.lastName;
}
console.timeEnd("Repeated Access");

// 구조 분해 할당
console.time("Destructuring");
for (let i = 0; i < 1000000; i++) {
  const { firstName, lastName } = user;
  const name = firstName + " " + lastName;
}
console.timeEnd("Destructuring");
