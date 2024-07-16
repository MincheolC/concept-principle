/**
 * 단순한 작업의 경우에는 Worker Threads를 사용하는 것이 오히려 더 느릴 수 있음. 이는 스레드를 생성하고 통신하는 데 드는 오버헤드 때문임.
 * Worker Threads는 주로 CPU 집약적인 작업을 분리하여 메인 스레드의 성능을 저하시키지 않기 위해 사용됨.
 *
 * Result
 * - Main Thread 실행 시간: 7.54 ms
 * - Worker Thread 실행 시간: 4.14 ms
 */

const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");
const { performance } = require("perf_hooks");

// 소수 여부를 확인하는 함수
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

// 성능 측정 함수
function measurePerformance(label, fn) {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${label} 실행 시간: ${(end - start).toFixed(2)} ms`);
}

// 워커를 생성하고 작업을 분배
function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0) reject(new Error(`Woㅜrker stopped with exit code ${code}`));
    });
  });
}

// 큰 배열 생성 (1부터 100,000까지의 숫자)
const array = Array.from({ length: 100000 }, (_, i) => i + 1);

if (isMainThread) {
  measurePerformance("Main Thread", () => {
    // 메인 스레드에서 직접 작업
    const primes = array.filter(isPrime);
    console.log(`Primes found: ${primes.length}`);
  });

  measurePerformance("Worker Thread", async () => {
    // 워커 스레드를 사용하여 작업 분배
    const partSize = Math.ceil(array.length / 4);
    const tasks = [
      array.slice(0, partSize),
      array.slice(partSize, 2 * partSize),
      array.slice(2 * partSize, 3 * partSize),
      array.slice(3 * partSize),
    ];

    const results = await Promise.all(tasks.map((task) => runWorker(task)));
    const primes = results.flat();
    console.log(`Primes found: ${primes.length}`);
  });
} else {
  // 워커 스레드에서 작업 수행
  const primes = workerData.filter(isPrime);
  parentPort.postMessage(primes);
}
