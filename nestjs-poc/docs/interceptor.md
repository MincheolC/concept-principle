# 인터셉터 (Interceptor)

## 정의

인터셉터(Interceptor)는 NestJS에서 제공하는 기능으로, 요청(Request)과 응답(Response)의 흐름을 가로채고, 추가적인 로직을 실행할 수 있도록 하는 미들웨어의 일종입니다. 인터셉터는 요청 전처리와 응답 후처리 시점에 모두 적용될 수 있습니다.

## 목적

인터셉터의 주요 목적은 다음과 같습니다:

- **요청 전처리**: 요청이 컨트롤러의 핸들러 메서드에 도달하기 전에 추가적인 로직을 실행할 수 있습니다.
- **응답 후처리**: 컨트롤러의 핸들러 메서드가 응답을 생성한 후, 클라이언트에게 응답이 반환되기 전에 추가적인 로직을 실행할 수 있습니다.
- **공통 로직 분리**: 로깅, 인증, 변환 등의 공통 로직을 분리하여 코드의 재사용성과 유지보수성을 높입니다.

## 사용처

인터셉터는 다음과 같은 다양한 상황에서 사용될 수 있습니다:

- **로깅 및 모니터링**: 요청 및 응답에 대한 로깅과 처리 시간 측정.
- **데이터 변환**: 응답 데이터를 특정 형식으로 변환.
- **성능 모니터링**: 요청 처리 시간을 측정하여 성능을 모니터링.
- **캐싱**: 요청에 대한 캐싱을 적용하여 응답 시간을 단축.
- **에러 핸들링**: 응답에 대한 공통 에러 핸들링 로직 적용.

## 요청 전처리 (Before Handling Request)

요청 전처리 시점은 클라이언트로부터 요청이 들어오고, 해당 요청이 컨트롤러의 핸들러 메서드에 도달하기 전에 인터셉터가 실행되는 시점입니다. 이 시점에서 추가적인 로직을 실행할 수 있습니다.

## 응답 후처리 (After Handling Response)

응답 후처리 시점은 컨트롤러의 핸들러 메서드가 응답을 생성한 후, 클라이언트에게 응답이 반환되기 전에 인터셉터가 실행되는 시점입니다. 이 시점에서 응답 데이터를 변환하거나 추가적인 로직을 실행할 수 있습니다.

## 적용 가능 범위

1. 전역
2. 컨트롤러
3. 메서드

## 예제 코드

### LoggingInterceptor

```typescript
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /**
     * 응답 전처리
     */
    const now = Date.now();
    console.log('Before handling the request...');

    return next.handle().pipe(
      /**
       * 응답 후처리
       */
      tap(() => console.log('After handling the request...')),
      tap(() => console.log(`Request processed in ${Date.now() - now}ms`)),
    );
  }
}
```

- `handle()`는 인터셉터에서 컨트롤러의 핸들러 메서드로 요청을 전달한 후, 해당 핸들러 메서드의 응답을 RxJS의 Observable로 반환
- `pipe()`는 여러 연산자를 체인으로 연결하여 Observable 변환하거나 처리
- `tap()`은 Observable에서 발행된 값이나 발생한 이벤트에 대해 부수효과를 수행

## 함께 알면 좋은 개념

[Rxjs (Reactive Extensions for Javascript)](./rxjs.md)
