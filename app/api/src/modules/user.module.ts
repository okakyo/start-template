import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from '../libs/config/prisma.service';

import {
  adminGetAllUsersUsecase,
  getUserUseCase,
  registerUserUseCase,
  updateProfileUseCase,
  withdrawUseCase,
} from '../usecases/users';
import { findPostsByAuthorIdUseCase } from '../usecases/posts';

import { UserRepository, PostRepository } from '../domains/interfaces';
import {
  UserRepositoryImpl,
  PostRepositoryImpl,
} from '../infra/repositoryImpl';

import { UserQuery } from '../resolvers/queries/user.query';
import { UserMutation } from '../resolvers/mutations/user.mutation';

import { PostModule } from 'src/modules/post.module';
import { getUserProfileUseCase } from 'src/usecases/users/getUserProfile.usecase';
import { AdminUserController } from 'src/resolvers/admin/admin-user.controller';

@Module({
  imports: [forwardRef(() => PostModule)],
  controllers: [AdminUserController],
  providers: [
    PrismaService,
    adminGetAllUsersUsecase,
    getUserUseCase,
    getUserProfileUseCase,
    registerUserUseCase,
    updateProfileUseCase,
    withdrawUseCase,
    findPostsByAuthorIdUseCase,
    UserQuery,
    UserMutation,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: PostRepository,
      useClass: PostRepositoryImpl,
    },
  ],
})
export class UserModule {}
