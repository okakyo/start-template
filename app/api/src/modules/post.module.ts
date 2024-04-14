import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import {getPostByIdUseCase,getPostsUseCase,CreatePostUseCase,UpdatePostUseCase,RemovePostUseCase, } from 'src/usecases/posts';
import { PostRepository,UserRepository } from 'src/domains/interfaces';
import { PostRepositoryImpl,UserRepositoryImpl } from 'src/infra/repositoryImpl';
import { PostQuery } from 'src/resolvers/queries/post.query';
import { PostMutation } from 'src/resolvers/mutations/post.mutation';
import { UserModule } from './user.module';
import { getUserUseCase } from 'src/usecases/users';


@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [
    PrismaService,
    getPostsUseCase,
    getPostByIdUseCase,
    CreatePostUseCase,
    UpdatePostUseCase,
    RemovePostUseCase,
    getUserUseCase,
    PostQuery,
    PostMutation,
    {
      provide: PostRepository,
      useClass: PostRepositoryImpl,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    }
  ],
})
export class PostModule {}
