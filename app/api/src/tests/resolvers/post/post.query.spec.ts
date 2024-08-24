import { Test, TestingModule } from '@nestjs/testing';
import { PostQuery } from '../../../resolvers/queries/post.query';
import { findPostByIdUseCase, findPostsUseCase } from 'src/usecases/posts';
import { PostRepository, UserRepository } from 'src/domains/interfaces';
import { getUserUseCase } from 'src/usecases/users';
describe('PostQuery', () => {
  let query: PostQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostQuery,
        findPostsUseCase,
        findPostByIdUseCase,
        getUserUseCase,
        {
          provide: PostRepository,
          useFactory: () => ({}),
        },
        {
          provide: UserRepository,
          useFactory: () => ({}),
        },
      ],
    }).compile();

    query = module.get<PostQuery>(PostQuery);
  });

  it('should be defined', () => {
    expect(query).toBeDefined();
  });
});
