import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';

describe('Database', () => {
  let provider: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [DatabaseService],
    }).compile();

    provider = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
