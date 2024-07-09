import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // primsa 모듈에서 exports하는 프로파이더(PrismaService)를 사용할 수 있게 함.
  controllers: [UsersController], // 인스턴스 생성
  providers: [UsersService], // 인스턴스 생성, Nestjs가 알아서 UsersService의 생성자에서 필요한 인자를 주입해줌.
})
export class UsersModule {}
