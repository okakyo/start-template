import { Module, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/libs/config/prisma.service';
import {
  findPostByIdUseCase,
  findPostsUseCase,
  CreatePostUseCase,
  UpdatePostUseCase,
  RemovePostUseCase,
} from 'src/usecases/posts';
import { PostRepository, UserRepository } from 'src/domains/interfaces';
import {
  PostRepositoryImpl,
  UserRepositoryImpl,
} from 'src/infra/repositoryImpl';
import { PostQuery } from 'src/resolvers/queries/post.query';
import { PostMutation } from 'src/resolvers/mutations/post.mutation';
import { UserModule } from './user.module';
import { getUserUseCase } from 'src/usecases/users';
import { adminGetAllPostsUseCase } from 'src/usecases/posts/adminGetAllPosts.usecase';
import { AdminPostController } from 'src/resolvers/admin/admin-post.controller';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [AdminPostController],
  providers: [
    PrismaService,
    adminGetAllPostsUseCase,
    findPostsUseCase,
    findPostByIdUseCase,
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
    },
  ],
})
export class PostModule {}
