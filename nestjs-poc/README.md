# NestJS의 기본 개념 익히기: 도서 관리 시스템(Book Management System)

> 목적: 인증 및 권한 부여, 데이터 검증, 예외 처리, 커스텀 데코레이터 등을 포함하여 **다양한 NestJS 기능**을 다룹니다. 또한, **`Prisma`와 `PostgreSQL`을 연동**하여 데이터베이스에 데이터를 쓰고 읽습니다.

실습으로 사용자들이 책을 추가하고, 수정하고, 삭제하며, 조회할 수 있는 도서관리 시스템을 구축합니다.

## 1. 요구사항

### 사용자 관리 (Users)

- **기능**:
  - 사용자 생성
  - 사용자 조회
- **NestJS 기능**: Controllers, Providers, Modules, Prisma, PostgreSQL

### 도서 관리 (Books)

- **기능**:
  - 도서 생성
  - 도서 조회
  - 도서 수정
  - 도서 삭제
- **NestJS 기능**: Controllers, Providers, Modules, Prisma, PostgreSQL, Exception Filters, Pipes

### 인증 및 권한 부여 (Auth)

- **기능**:
  - 사용자의 인증 (로그인)
  - 특정 권한이 있는 사용자만 도서를 생성, 수정, 삭제할 수 있음
- **NestJS 기능**: Middleware, Guards, Custom Decorators

### 로깅 및 성능 측정

- **기능**:
  - 모든 요청에 대한 로깅
  - 요청 처리 시간을 측정하여 로깅
- **NestJS 기능**: Interceptors

## 2. 상세 요구사항

### 사용자 관리 (Users)

#### 사용자 생성

- 요청: POST /users
- 요청 본문: 사용자 정보 (이름, 이메일, 비밀번호)
- 응답: 생성된 사용자 정보

#### 사용자 조회

- 요청: GET /users/:id
- 요청 매개변수: 사용자 ID
- 응답: 사용자 정보

### 도서 관리 (Books)

#### 도서 생성

- 요청: POST /books
- 요청 본문: 도서 정보 (제목, 저자, 설명)
- 응답: 생성된 도서 정보
- 요구사항: 관리자 권한이 있는 사용자만 생성 가능

#### 도서 조회

- 요청: GET /books/:id
- 요청 매개변수: 도서 ID
- 응답: 도서 정보

#### 도서 수정

- 요청: PUT /books/:id
- 요청 매개변수: 도서 ID
- 요청 본문: 수정할 도서 정보 (제목, 저자, 설명)
- 응답: 수정된 도서 정보
- 요구사항: 관리자 권한이 있는 사용자만 수정 가능

#### 도서 삭제

- 요청: DELETE /books/:id
- 요청 매개변수: 도서 ID
- 응답: 삭제된 도서 정보
- 요구사항: 관리자 권한이 있는 사용자만 삭제 가능

### 인증 및 권한 부여 (Auth)

#### 사용자 로그인

- 요청: POST /auth/login
- 요청 본문: 로그인 정보 (이메일, 비밀번호)
- 응답: JWT 토큰

#### 권한 부여

- 미들웨어를 통해 JWT 토큰 검증
- RolesGuard를 통해 관리자 권한 확인
- 관리자 권한이 없는 경우 접근 제한

### 로깅 및 성능 측정

#### 요청 로깅

- 모든 요청에 대해 로깅 (요청 경로, 요청 매개변수, 응답 상태)

#### 성능 측정

- 요청 처리 시간을 측정하여 로깅

## 3. 실습할 NestJS 기능

| 기능         | 설명                                                                                |
| ------------ | ----------------------------------------------------------------------------------- |
| Controllers  | 사용자와 도서 관련 API 엔드포인트를 처리하는 컨트롤러를 생성합니다.                 |
| Providers    | 사용자와 도서 관련 비즈니스 로직을 처리하는 서비스를 생성합니다.                    |
| Modules      | 사용자, 도서, 인증 모듈을 생성하여 모듈 간 의존성을 관리합니다.                     |
| Middleware   | JWT 토큰을 검증하는 인증 미들웨어를 생성하여 모든 요청에 적용합니다.                |
| Exception    | Filters 모든 예외를 처리하고, 표준화된 오류 응답을 제공하는 예외 필터를 생성합니다. |
| Pipes        | 도서 생성 및 수정 시 입력 데이터를 검증하는 파이프를 생성합니다.                    |
| Guards       | 특정 엔드포인트에 접근할 때 사용자의 권한을 검증하는 가드를 생성합니다.             |
| Interceptors | 모든 요청에 대해 로깅 및 요청 처리 시간을 측정하는 인터셉터를 생성합니다.           |
| Custom       | Decorators 사용자 권한을 설정하고 검증하는 커스텀 데코레이터를 생성합니다.          |

## 4. 실습

### Prisma 및 PostgreSQL 설치

```sh
npm install @prisma/client
npm install --save-dev prisma
npm install @nestjs/config @nestjs/jwt @nestjs/passport passport passport-jwt
npm install pg
```

### Prisma 설정

```sh
npx prisma init
npx prisma migrate dev --name init
```

### Prisma 모듈 및 서비스 생성

```sh
nest g mo prisma
nest g s prisma
```

### User 리소스 생성

```sh
nest g resource users
```
