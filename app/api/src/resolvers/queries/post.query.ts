import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { findPostByIdUseCase, findPostsUseCase } from '../../usecases/posts';
import { PostObject } from '../../infra/objects/post.object';
import { UserObject } from 'src/infra/objects';
import { getUserUseCase } from 'src/usecases/users';
import { newPostId } from 'src/domains/entities/post.entity';
import { newUserId } from 'src/domains/entities/user.entity';

@Resolver(() => PostObject)
export class PostQuery {
  constructor(
    private readonly findPostsUseCase: findPostsUseCase,
    private readonly findPostByIdUseCase: findPostByIdUseCase,
    private readonly getUserUseCase: getUserUseCase,
  ) {}

  @Query(() => [PostObject], { name: 'posts' })
  async posts() {
    return await this.findPostsUseCase.exec();
  }

  @Query(() => PostObject, { name: 'post', nullable: true })
  async post(@Args('id') id: string) {
    const parsedPostId = newPostId(id);
    return await this.findPostByIdUseCase.exec(parsedPostId);
  }

  @ResolveField(() => UserObject, { name: 'author' })
  async author(@Parent() post: PostObject) {
    const { authorId } = post;
    const parsedAuthorId = newUserId(authorId);
    return await this.getUserUseCase.exec(parsedAuthorId);
  }
}
