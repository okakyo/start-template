import { Test, TestingModule } from '@nestjs/testing';
import { UserQuery } from 'src/resolvers/queries/user.query';

describe('UserResolver', () => {
  let query: UserQuery ;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserQuery],
    }).compile();

    query = module.get<UserQuery>(UserQuery);
  });

  it('should be defined', () => {
    expect(query).toBeDefined();
  });
});
