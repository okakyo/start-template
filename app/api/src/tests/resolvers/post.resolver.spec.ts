import { Test, TestingModule } from '@nestjs/testing';
import { PostResolver } from '../../resolvers/queries/post.query';

describe('WorkResolver', () => {
  let resolver: PostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostResolver],
    }).compile();

    resolver = module.get<PostResolver>(PostResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
