import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user.service';
import { DatabaseService } from '../database/database.service';

class MockDatabaseService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getDataSource(_connectionName: string) {
    return {
      getRepository: jest.fn().mockReturnValue({
        findOne: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
      }),
    };
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [UserService, DatabaseService],
    })
      .overrideProvider(DatabaseService)
      .useClass(MockDatabaseService)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
