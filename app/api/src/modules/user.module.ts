import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from '../config/prisma/prisma.service';

import { getUserUseCase, registerUserUseCase, updateProfileUseCase, withdrawUseCase } from '../usecases/users';
import { getPostsByAuthorIdUseCase } from '../usecases/posts';

import { UserRepository,PostRepository } from '../domains/interfaces';
import { UserRepositoryImpl, PostRepositoryImpl } from '../infra/repositoryImpl';

import { UserQuery } from '../resolvers/queries/user.query'
import { UserMutation } from '../resolvers/mutations/user.mutation';

import { PostModule } from 'src/modules/post.module';

@Module({
  imports: [forwardRef(() => PostModule)],
  providers: [
    PrismaService,
    getUserUseCase,
    registerUserUseCase,
    updateProfileUseCase,
    withdrawUseCase,
    getPostsByAuthorIdUseCase,
    UserQuery,
    UserMutation,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: PostRepository,
      useClass: PostRepositoryImpl,
    }
  ],
})
export class UserModule {}
