# TypeORM POC

- 환경변수를 사용하여 DB 설정을 .env에서 가져오도록 함 (쉬운 설정 + 보안강화)
- 보통 배포환경 (e.g. 개발, 스테이징, 운영)별로 설정을 관리 (`@nestjs/config` 사용)
- `useFactory`는 비동기 설정을 지원하기 위해 사용되는 팩토리 함수입니다.
  - 팩토리 함수(Factory Function)는 객체를 생성하기 위한 함수. 특정 클래스 인스턴스를 직접 생성하는 대신 객체 생성 과정을 캡슐화하여 필요에 따라 다양한 인스턴스를 반환할 수 있음

## TypeOrmModule vs DatabaseProvider

- 일반적인 NestJS 애플리케이션에서는 TypeOrmModule을 사용해 데이터베이스 연결을 설정하는 것이 가장 권장되는 방식

```ts
imports: [
  ConfigModule.forRoot({
    isGlobal: true, // 전역 모듈로 설정
    envFilePath:
      process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>('MYSQL_HOST'),
      port: configService.get<number>('MYSQL_PORT'),
      username: configService.get<string>('MYSQL_USERNAME'),
      password: configService.get<string>('MYSQL_PASSWORD'),
      database: configService.get<string>('MYSQL_DATABASE'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // 모든 엔티티 파일을 자동으로 로드
      synchronize: configService.get<string>('NODE_ENV') !== 'production', // 개발 환경에서만 사용
    }),
    inject: [ConfigService],
  }),
],
```

- 하지만 특정 상황에서는 DatabaseProvider를 사용하는 것이 유용할 수 있음
  - 예를 들어, 데이터베이스 연결을 동적으로 관리해야 하는 경우
  - 여러 데이터베이스 인스턴스를 사용해야 하는 경우
  - 특정 데이터베이스 인스턴스를 초기화하는 과정에서 추가적인 로직이 필요한 경우
