import { Test, TestingModule } from '@nestjs/testing';
import { PostQuery } from '../../../resolvers/queries/post.query';
describe('PostQuery', () => {
  let query: PostQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostQuery],
    }).compile();

    query = module.get<PostQuery>(PostQuery);
  });

  it('should be defined', () => {
    expect(query).toBeDefined();
  });
});
