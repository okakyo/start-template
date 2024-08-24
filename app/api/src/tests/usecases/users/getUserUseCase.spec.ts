import { Test, TestingModule } from '@nestjs/testing';
import { getUserUseCase } from '../../../usecases/users/getUser.usecase';
import { UserRepository } from 'src/domains/interfaces';

describe('getUserUseCase', () => {
  let service: getUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [getUserUseCase,
        {
          provide: UserRepository,
          useFactory: () => ({
            findUserById: jest.fn(),
          }),
        }
       ],
    }).compile();

    service = module.get<getUserUseCase>(getUserUseCase);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
