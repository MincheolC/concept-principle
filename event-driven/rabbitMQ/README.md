# RabbitMQ 실습 요구사항

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

### 추가 사항

1. 메세지 지속성 옵션을 탐구하고, 실패 시나리오에서 메세지 복구를 어떻게 처리할지 연구할 것
2. 로드 테스팅을 수행하여 각 시스템의 성능을 평가하기

### 실행

```sh
npm run queue:up
npx ts-node publisher.ts
npx ts-node subscriber.ts

# 테스트 끝나면 큐 삭제하기
npm run queue:down
```
