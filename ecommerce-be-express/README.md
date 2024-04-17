# Ecommerce BE with Express(Backend)

이커머스의 핵심 엔티티 중 User, Product, Order를 구현해봅시다.

## 실습 요구사항

### 환경

- Typescript
- Node.js
- Prisma (with PostgreSQL)
- Express

### 데이터

#### 엔티티

- User
- Product (100만 ~ 1000만 상품)
- ProductOption (상품 하나 당 3개의 옵션)
- Order
- OrderProduct

#### 엔티티 간의 관계

- `user:order = 1:n`
- `order:order_product = 1:n`
- `order_product:product_option = 1:1`
- `product:product_option = 1:n`

### API

RESTful API와 GraphQL API를 동시에 지원해야 합니다.

- user를 생성/수정/조회 할 수 있다.
- order를 생성/조회 할 수 있다.
- product를 생성/수정/조회 할 수 있다.

### 상품 생성 스크립트

추후, 조회 성능 테스트 및 쿼리 튜닝 테스트를 위해 상품 데이터를 랜덤하게 생성할 수 있는 스크립트를 작성합니다.

- argument로 생성 개수(n)를 입력 받습니다.
- n개 만큼 상품을 생성하고, 상품 별로 3개의 옵션(A,B,C)을 추가합니다.

### 테스트

- order 생성 및 조회에 대한 E2E 테스트를 작성합니다.

### 추가적인 서버 요구사항

- IP WhiteList 관리
- D-DOS 공격 방어

## 실습

### 프로젝트 셋업

```sh
npm init -y
tsc --init
npx prisma init --datasource-provider postgresql

mkdir src  src/routes src/middleware src/controllers src/resolvers src/models src/services src/utils
touch src/index.ts src/app.ts
```
