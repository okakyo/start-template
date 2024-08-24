import { PrismaService } from 'src/libs/config/prisma.service';
import { PostRepository } from '../../domains/interfaces/post.repository';
import {
  AdminPosts,
  PostEntity,
  PostId,
  newAdminPosts,
  newPostEntity,
  newPostId,
} from '../../domains/entities/post.entity';
import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from 'src/domains/dtos/post';
import { UserId } from 'src/domains/entities/user.entity';
import { OffsetPaginationArgs } from 'src/domains/dtos/utils/pagination.dto';
import { newPagination } from 'src/domains/entities/utils';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(private readonly prismaService: PrismaService) {}
  // TODO: アカウント権限で取得できるようにすること、チームごとのユーザーで取得できるようにすること
  async adminGetAllPosts(
    pagination: OffsetPaginationArgs,
  ): Promise<AdminPosts> {
    const { skip, take } = pagination;

    const [posts, totalCount] = await Promise.all([
      this.prismaService.post.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.post.count(),
    ]);
    const parsedUsers = posts.map((post) =>
      newPostEntity({
        id: post.id,
        title: post.title,
        content: post.content,
        isPublished: post.isPublished,
        authorId: post.authorId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        deletedAt: post.deletedAt,
      }),
    );

    const parsedPagination = newPagination({
      totalCount,
    });
    const response = newAdminPosts({
      ...parsedPagination,
      nodes: parsedUsers,
    });
    return response;
  }
  async findPosts() {
    const posts = await this.prismaService.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts.map((post) => {
      return newPostEntity(post);
    });
  }
  async findPostById(id: PostId): Promise<PostEntity | null> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: id,
      },
    });
    if (!post) {
      return null;
    }
    return newPostEntity(post);
  }

  async findPostsByAuthorId(authorId: UserId): Promise<PostEntity[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        authorId: authorId,
      },
    });
    return posts.map((post) => {
      return newPostEntity(post);
    });
  }

  async createPost(Post: CreatePostDto): Promise<PostEntity | null> {
    const post = await this.prismaService.post.create({
      data: {
        title: Post.title,
        content: Post.content,
        isPublished: Post.isPublished,
        authorId: 'test',
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!post) {
      return null;
    }
    return newPostEntity(post);
  }
  // TODO: Define the Input type of the Post parameter
  async updatePost(input: UpdatePostDto): Promise<PostEntity | null> {
    const { id, ...data } = input;
    const updatedPost = await this.prismaService.post.update({
      where: {
        id: id,
      },
      data,
    });
    if (!updatedPost) {
      return null;
    }
    return newPostEntity(updatedPost);
  }

  async deletePost(id: PostId): Promise<boolean> {
    const post = await this.prismaService.post.delete({
      where: {
        id: id,
      },
    });
    return post ? true : false;
  }
}
