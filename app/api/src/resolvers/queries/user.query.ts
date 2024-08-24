import { BadRequestException } from '@nestjs/common';
import { Parent, ResolveField, Resolver, Query, Args } from '@nestjs/graphql';
import {
  OffsetPaginationArgs,
  newOffsetPaginationArgs,
} from 'src/domains/dtos/utils/pagination.dto';
import { newUserId } from 'src/domains/entities/user.entity';
import { PostObject } from 'src/infra/objects/post.object';
import {
  PaginatedUserDetailObject,
  UserDetailObject,
} from 'src/infra/objects/user.object';
import { findPostsByAuthorIdUseCase } from '../../usecases/posts';
import {
  getUserProfileUseCase,
  adminGetAllUsersUsecase,
} from '../../usecases/users';

@Resolver(() => UserDetailObject)
export class UserQuery {
  // Add your user queries here
  constructor(
    private readonly findPostsByAuthorIdUseCase: findPostsByAuthorIdUseCase,
    private readonly getUserProfileUseCase: getUserProfileUseCase,
    private readonly adminGetAllUsersUsecase: adminGetAllUsersUsecase,
  ) {}

  @Query(() => PaginatedUserDetailObject, { name: 'users' })
  async users(
    @Args('pagination', { nullable: true }) pagination?: OffsetPaginationArgs,
  ) {
    const skip = pagination?.skip || 0;
    const take = pagination?.take || 10;

    const args = newOffsetPaginationArgs({ skip, take });
    if (!args.success) {
      throw new BadRequestException('Invalid pagination arguments');
    }

    return await this.adminGetAllUsersUsecase.exec(args.output);
  }

  @Query(() => UserDetailObject, { name: 'user', nullable: true })
  async user(@Args('id') id: string) {
    const userId = newUserId(id);
    const user = await this.getUserProfileUseCase.exec(userId);
    return user;
  }

  @ResolveField(() => [PostObject], { name: 'posts', nullable: true })
  async posts(@Parent() profile: UserDetailObject) {
    const { id } = profile;
    const userId = newUserId(id);
    const posts = await this.findPostsByAuthorIdUseCase.exec(userId);
    return posts;
  }
}
