import { Test, TestingModule } from '@nestjs/testing';
import { PostRepository, UserRepository } from 'src/domains/interfaces';
import { UserQuery } from 'src/resolvers/queries/user.query';
import { findPostsByAuthorIdUseCase } from 'src/usecases/posts';
import { adminGetAllUsersUsecase, getUserProfileUseCase } from 'src/usecases/users';

const mockUserFactory = () => ({
});

describe('UserResolver', () => {
  let query: UserQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserQuery,
        findPostsByAuthorIdUseCase,
        getUserProfileUseCase,
        adminGetAllUsersUsecase,
        {
        provide: UserRepository,
        useFactory: mockUserFactory,
        },
        {
          provide: PostRepository,
          useFactory: () => ({}),
        }
      ],

    }).compile();

    query = module.get<UserQuery>(UserQuery);
  });

  it('should be defined', () => {
    expect(query).toBeDefined();
  });
});
