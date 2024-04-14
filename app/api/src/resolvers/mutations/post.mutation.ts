import { Mutation, Resolver,Args} from "@nestjs/graphql";
import { CreatePostInput,UpdatePostInput } from "src/domains/dtos/post";
import { PostObject } from "src/infra/objects/post.object";
import { CreatePostUseCase, RemovePostUseCase, UpdatePostUseCase } from "src/usecases/posts";

@Resolver(of => PostObject)
export class PostMutation {
  // Add your post mutations here
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly removePostUseCase: RemovePostUseCase,
  ) { }

  @Mutation(returns => PostObject)
  async createPost(@Args('post') post: CreatePostInput) {
    return await this.createPostUseCase.exec(post);
  }

  @Mutation(returns => PostObject)
  async updatePost(@Args('id') id: string, @Args('post') post: UpdatePostInput) {
    return await this.updatePostUseCase.exec(id, post);
  }

  @Mutation(returns => Boolean)
  async removePost(@Args('id') id: string) {
    return await this.removePostUseCase.exec(id);
  }
}

