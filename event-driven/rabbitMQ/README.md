# RabbitMQ

## 실습

### 환경 설정

1. Node.js, Typescript을 사용합니다.
2. Docker를 사용하여 로컬 환경에서 RabbitMQ 서버를 실행합니다.
3. docker-compose.yml 파일을 포함하여 RabbitMQ 서버 설정을 관리합니다.

### 기본 퍼블리셔 및 서브스크라이버 구현

1. 하나의 퍼블리셔(Publisher) 애플리케이션과 두 개의 서브스크라이버(Subscriber) 애플리케이션을 구현합니다.
2. 퍼블리셔는 정기적으로 메시지를 "news" 큐에 발행합니다.
3. 서브스크라이버들은 "news" 큐를 구독하고, 수신한 메시지를 콘솔에 출력합니다.

### 메시지 확인

1. 메시지가 정상적으로 큐에 전달되고 각 서브스크라이버에 의해 수신되는지 확인합니다.

### 실행

```sh
npm run queue:up
npx ts-node publisher.ts
npx ts-node subscriber.ts

# 테스트 끝나면 큐 삭제하기
npm run queue:down
```

## 가용성

### 메세지 지속성 옵션

```js
// Queue 레벨 설정
channel.assertQueue(queue, {
  // RabbitMQ 서버가 재시작되더라도 큐 구조가 유지됨
  durable: true,
  // TTL & DLX
  arguments: {
    "x-message-ttl": 60000, // ms
    "x-dead-letter-exchange": "some.exchange.name", // DLX 이름 설정 (일종의 메세지 게이트웨이)
    "x-dead-letter-routing-key": "some-routing-key", // DLX로 보낼 때 사용할 라우팅 키
  },
});

// Message 레벨 설정
channel.sendToQueue(queue, Buffer.from(message), {
  persistent: true, // 서버가 다운된 후에도 메세지가 사라지지 않음
  expiration: "60000", // 개별 메세지 TTL (ms)
});
```

### 실패 시나리오에 따른 메세지 복구

1.  실패 시나리오
    1. 서버장애
    2. 네트워크 장애
    3. 소비자 실패
2.  메세지 복구 전략
    1. 미러드 큐 (Mirrored Queues)
    2. 데이터 복제 (Data Replication): 데이터를 외부 시스템에 중복 저장
    3. 자동 재시도 (Automatic Retry): **TTL**, **Dead Letter Exchanges(명시적 거부 등으로 처리할 수 없거나 TTL이 만료된 메세지를 다루기 위한 방법)** 등을 활용하여 재시도 구성
    4. 메세지 트래킹과 로깅
    5. 정기적 백업
3.  로드 테스팅을 수행하여 각 시스템의 성능 평가

### DLX (Dead Letter Exchanges)란?

#### 역할과 기능

1. **메시지 라우팅**: DLX는 실패한 메시지를 받아서 사전에 정의된 라우팅 규칙(라우팅 키)에 따라 적절한 큐로 전달합니다. 이는 처리 실패한 메시지를 별도로 관리하고, 필요에 따라 재처리하거나 분석할 수 있는 유연성을 제공합니다.
2. **에러 핸들링**: 메시지가 처리되지 못한 원인을 로깅하거나 분석할 수 있도록 하며, 시스템의 다른 부분이 중단되지 않고 계속해서 정상적으로 작동할 수 있도록 돕습니다.
3. **재처리 및 모니터링**: 실패한 메시지를 따로 수집하여 그 원인을 분석하고, 수정 후 재처리를 위한 메커니즘을 제공합니다. 또한, 이러한 메시지들을 모니터링하여 시스템의 안정성을 강화할 수 있습니다.

#### 동작과정

1. queue에서 처리할 수 없는 메세지가 발생하면, DLX로 전송됨.
2. DLX는 routing-key를 사용하여 매핑되어있는 dead_letter_queue로 전달함

#### 유즈케이스

여러 DLX 사용하거나 하나의 DLX로 여러 routing-key 사용해서 구현할 수 있음

1. 다양한 유형의 실패 처리
2. 서비스 별 실패 처리
3. 우선순위 별 실패 처리
4. 법적 또는 규제 요구사항 처리

### Log

1. RabbitMQ 로그: 서버의 상태, 클라이언트 연결, 에러 발생사항 등이 남음
2. Application 로그: Producer와 Consumer에서 발생하는 메세지 처리 관련 로그는 직접 남겨야 함
3. Message Tracing 로그: `rabbitmq_tracing` 플러그인을 추가하여 메세지 추적을 할 수 있음
