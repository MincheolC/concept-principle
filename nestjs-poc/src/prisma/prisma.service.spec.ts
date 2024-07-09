import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService); // 테스트 모듈에서 PrismaService 인스턴스를 가져옴
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
