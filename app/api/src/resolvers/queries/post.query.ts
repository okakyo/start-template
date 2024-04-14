import { Resolver, Query,Args, ResolveField, Parent } from '@nestjs/graphql';
import { getPostByIdUseCase, getPostsUseCase } from '../../usecases/posts';
import { getUserUseCase } from 'src/usecases/users';
import { PostObject } from '../../infra/objects/post.object';
import { UserObject } from 'src/infra/objects/user.object';

@Resolver(of => PostObject)
export class PostQuery {
  constructor(
    private readonly getPostsUseCase: getPostsUseCase,
    private readonly getPostByIdUseCase: getPostByIdUseCase,
  ) { }

  @Query(returns => [PostObject], { name: 'posts' })
  async posts() {
    return await this.getPostsUseCase.exec();
  }


  @Query(returns => PostObject, { name: 'post', nullable: true })
  async post(@Args('id') id: string) {
    return await this.getPostByIdUseCase.exec(id);
  }
}
