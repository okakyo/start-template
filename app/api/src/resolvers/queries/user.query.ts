import { Parent, ResolveField, Resolver,Query,Args } from "@nestjs/graphql";
import { PaginationArgs } from "src/domains/dtos/utils/pagination.dto";
import { newUserId } from "src/domains/entities/user.entity";
import { PostObject } from "src/infra/objects/post.object";
import { PaginatedUserDetailObject, UserDetailObject, } from "src/infra/objects/user.object";
import { findPostsByAuthorIdUseCase } from "src/usecases/posts";
import { getUserProfileUseCase,adminGetAllUsersUsecase } from "src/usecases/users";
@Resolver((of) => UserDetailObject)
export class UserQuery {
  // Add your user queries here
  constructor(
    private readonly findPostsByAuthorIdUseCase: findPostsByAuthorIdUseCase,
    private readonly getUserProfileUseCase: getUserProfileUseCase,
    private readonly adminGetAllUsersUsecase: adminGetAllUsersUsecase
  ) { }

  @Query(returns => PaginatedUserDetailObject, { name: 'users' })
  async users(@Args("pagination") pagination: PaginationArgs) {

    return await this.adminGetAllUsersUsecase.exec(pagination);
  }

  @Query(returns => UserDetailObject, { name: 'user', nullable: true })
  async user(@Args('id') id: string){
    const userId = newUserId(id);
    const user =  await this.getUserProfileUseCase.exec(userId);
    return user;
  }

  @ResolveField(type=>[PostObject], {name: 'posts',nullable: true})
  async posts(@Parent() profile:  UserDetailObject) {
    const { id } = profile;
    const userId = newUserId(id);
    const posts = await this.findPostsByAuthorIdUseCase.exec(userId);
    return posts;
  }
}
