# Firebase Auth (with Next.js)

Firebase Authentication을 사용해서, 소셜 로그인(구글, 페이스북)을 구현합니다.
네이버, 카카오 로그인은 지원하지 않으므로 추가 개발해야합니다.

## Step By Step

### 1. Prerequisite

#### Next.js 앱 생성

```sh
npx create-next-app@latest
```

#### Facebook App 생성

Facebook developer 페이지에 접속하여 App을 생성합니다.

### 2. Firebase 프로젝트 설정

1. Firebase 콘솔에서 새 프로젝트를 생성합니다. ([Spark 요금제](https://firebase.google.com/pricing?hl=ko) 사용)
2. Web App을 생성합니다.
3. Authentication (사용자 인증 및 관리) 섹션으로 이동하여 로그인 방법 추가하기
   1. Google, Facebook 로그인 제공업체 추가

### 3. Firebase 설정 및 초기화

#### firebase 모듈 설치

```sh
npm install firebase
```

#### .env에 Firebase 설정 값 추가

```txt
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=**your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=**your_measurement_id
```

#### Firebase 초기화 모듈 생성

[lib/utils/firebase.ts](./lib/utils/firebase.ts)

### 4. 로그인 페이지 구현

1. 각 브랜드 로그인 가이드 따르기
   - [구글 로그인 브랜드 가이드라인](https://developers.google.com/identity/branding-guidelines?hl=ko)
   - [페이스북 로그인 브랜드 가이드라인](https://developers.facebook.com/docs/facebook-login/userexperience#buttondesign)
   - [페이스북 브랜드 로고 리소스](https://about.meta.com/brand/resources/facebook/logo/)
2. 로그인 버튼 구현하기
3. 로그아웃 버튼 구현하기
4. 로그인 상태이면 로그아웃 버튼 보여주기
