import { Parent, ResolveField, Resolver,Query,Args } from "@nestjs/graphql";
import { PostObject } from "src/infra/objects/post.object";
import { UserObject } from "src/infra/objects/user.object";
import { getPostsByAuthorIdUseCase } from "src/usecases/posts";
import { getUserUseCase } from "src/usecases/users";

@Resolver((of) => UserObject)
export class UserQuery {
  // Add your user queries here
  constructor(
    private readonly getPostsByAuthorIdUseCase: getPostsByAuthorIdUseCase,
    private readonly getUsersUseCase: getUserUseCase,
  ) {}

  @Query(returns => UserObject, { name: 'user', nullable: true })
    // TODO: 引数を dtos で定義する

  async user(@Args('id') id: string){
    const user =  await this.getUsersUseCase.exec(id);
    return user;
  }

  @ResolveField(type=>[PostObject], {name: 'posts'})
  async posts(@Parent() user: UserObject) {
    const { id } = user;
    const posts = await this.getPostsByAuthorIdUseCase.exec(id);
    return posts;
  }
}
