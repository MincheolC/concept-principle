import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * rxjs(Reactive Extensions for Javascript)는 비동기 프로그래밍을 위한 라이브러리.
 * - Observable 시퀀스를 사용하여 비동기 작업을 처리하고 데이터를 스트림으로 다룸.
 * - Javascript에서 데이터 스트림과 이벤트 기반 프로그램을 작성할 때 강력한 기능을 제공함.
 */

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    /**
     * 응답 잔처리
     */
    const now = Date.now();
    return (
      next
        // handle()은 컨트롤러의 handler 메서드로 요청을 전달 후 rxjs의 Observable 반환
        .handle()
        // pipe()는 여러 연산자를 체인으로 연결하여 Observable 변환하거나 처리
        .pipe(
          /**
           * 응답 후처리
           */

          // tap()은 Observable에서 발행된 값이나 발생한 이벤트에 대해 부수효과를 수행
          tap(() => console.log(`Request processed in ${Date.now() - now}ms`)),
        )
    );
  }
}
