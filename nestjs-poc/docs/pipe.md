# Pipe

## 정의

NestJS에서 Pipe는 **데이터 변환 및 유효성 검사를 수행하는 데 사용되는 클래스**입니다. Pipe는 컨트롤러 경로 핸들러가 처리하기 전에 인수(Arguments)를 가로채서 변환 또는 유효성 검사를 수행합니다. Pipe는 전역, 컨트롤러, 또는 특정 핸들러 레벨에서 적용할 수 있습니다.

## 목적

- **데이터 변환**: 클라이언트에서 받은 데이터를 특정 형식으로 변환합니다.
- **유효성 검사**: 클라이언트에서 받은 데이터가 특정 조건을 충족하는지 확인합니다.
- **중복 코드 제거**: 반복되는 데이터 변환 및 유효성 검사 로직을 중앙 집중화하여 코드의 재사용성을 높입니다.

## 사용처

- **전역 적용**: 모든 경로 핸들러에 파이프를 적용하여 전역적으로 데이터를 변환하거나 유효성 검사를 수행합니다.
- **컨트롤러 레벨 적용**: 특정 컨트롤러의 모든 경로 핸들러에 파이프를 적용합니다.
- **핸들러 레벨 적용**: 특정 경로 핸들러에만 파이프를 적용합니다.
- **파라미터 데코레이터**: 특정 파라미터에 대해 파이프를 적용하여 데이터 변환 또는 유효성 검사를 수행합니다.

## 동작 과정

1. **클라이언트 요청**: 클라이언트가 서버에 HTTP 요청을 보냅니다.
2. **요청 가로채기**: 요청이 컨트롤러 경로 핸들러에 도달하기 전에 파이프가 요청 데이터를 가로챕니다.
3. **데이터 변환 및 유효성 검사**: 파이프가 데이터를 변환하거나 유효성 검사를 수행합니다.
4. **핸들러 실행**: 변환 및 유효성 검사가 완료된 후, 컨트롤러의 경로 핸들러가 실행됩니다.
5. **응답 반환**: 핸들러의 실행 결과가 클라이언트에게 반환됩니다.

## 가능한 적용 범위

1. 전역
2. 컨트롤러
3. 메서드

## 예제 코드

### 파이프 생성

```typescript
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata, // 메타데이터를 통해 인수의 유형 및 기타 정보를 제공
  BadRequestException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value); // 평문 객체를 클래스 인스턴스로 변환합니다
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  /**
   * 메타타입이 기본 타입이 아닌 경우에는 true를 반환
   */
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```
