import { Test, TestingModule } from '@nestjs/testing';
import { PostGptService } from './post-gpt.service';

describe('PostGptService', () => {
  let service: PostGptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostGptService],
    }).compile();

    service = module.get<PostGptService>(PostGptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
