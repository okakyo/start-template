import { Test, TestingModule } from '@nestjs/testing';
import {PostMutation} from '../../../resolvers/mutations/post.mutation';

describe('PostMutation', () => {
  let mutation: PostMutation;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostMutation],
    }).compile();

    mutation = module.get<PostMutation>(PostMutation);
  });

  it('should be defined', () => {
    expect(mutation).toBeDefined();
  });
});
