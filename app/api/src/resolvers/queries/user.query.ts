import { Parent, ResolveField, Resolver,Query,Args } from "@nestjs/graphql";
import { newUserId } from "src/domains/entities/user.entity";
import { PostObject } from "src/infra/objects/post.object";
import { UserObject,UserDetailObject, } from "src/infra/objects/user.object";
import { findPostsByAuthorIdUseCase } from "src/usecases/posts";
import { getUserUseCase } from "src/usecases/users";
import { getUserProfileUseCase } from "src/usecases/users/getUserProfile.usecase";

@Resolver((of) => UserDetailObject)
export class UserQuery {
  // Add your user queries here
  constructor(
    private readonly findPostsByAuthorIdUseCase: findPostsByAuthorIdUseCase,
    private readonly getUserProfileUseCase: getUserProfileUseCase
  ) { }

  @Query(returns => UserDetailObject, { name: 'user', nullable: true })
  async user(@Args('id') id: string){
    const userId = newUserId(id);
    const user =  await this.getUserProfileUseCase.exec(userId);
    return user;
  }

  @ResolveField(type=>[PostObject], {name: 'posts',nullable: true})
  async posts(@Parent() profile:  UserDetailObject) {
    const { id } = profile;
    const posts = await this.findPostsByAuthorIdUseCase.exec(id);
    return posts;
  }
}
