import { Test, TestingModule } from '@nestjs/testing';
import { PostMutation } from '../../../resolvers/mutations/post.mutation';
import { adminGetAllPostsUseCase, CreatePostUseCase, findPostByIdUseCase, findPostsUseCase, RemovePostUseCase, UpdatePostUseCase } from 'src/usecases/posts';
import { PostRepository, UserRepository } from 'src/domains/interfaces';
import { adminGetAllUsersUsecase } from 'src/usecases/users';

describe('PostMutation', () => {
  let mutation: PostMutation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostMutation,
        findPostByIdUseCase,
        CreatePostUseCase,
        UpdatePostUseCase,
        RemovePostUseCase,
        {
          provide: PostRepository,
          useFactory: () => ({}),
        },
        {
          provide: UserRepository,
          useFactory: () => ({}),
        }
      ],
    }).compile();

    mutation = module.get<PostMutation>(PostMutation);
  });

  it('should be defined', () => {
    expect(mutation).toBeDefined();
  });
});
