import { PrismaService } from "src/config/prisma/prisma.service";
import { PostRepository } from "../../domains/interfaces/post.repository";
import { PostEntity } from "../../domains/entities/post.entity";
import { Injectable } from "@nestjs/common";
import { CreatePostDto, UpdatePostDto } from "src/domains/dtos/post";

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  async getPosts() {
    const posts = await this.prismaService.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        author: true
      }
    });
    return posts.map((post) => {
      return new PostEntity(
        post.id,
        post.title,
        post.content,
        post.isPublished,
        post.createdAt,
        post.updatedAt,
        post.author
      );
    })
  }
  async getPostById(id: string): Promise<PostEntity|null> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: id
      },
      include: {
        author: true
      }
    });
    if (!post) {
      // TODO: 404 エラーを出す
      return null;
    }
    return new PostEntity(
      post.id,
      post.title,
      post.content,
      post.isPublished,
      post.createdAt,
      post.updatedAt,
      post.author
    );
  }

  async getPostsByAuthorId(authorId: string): Promise<PostEntity[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        authorId: authorId
      },
    });
    return posts.map((post) => {
      return new PostEntity(
        post.id,
        post.title,
        post.content,
        post.isPublished,
        post.createdAt,
        post.updatedAt,
      );
    });
  }

  async createPost(Post: CreatePostDto): Promise<PostEntity|null> {
    // TODO: Define the Input type of the Post parameter
    // TODO: 認証機能を導入する

    const post = await this.prismaService.post.create({
      data: {
        title: Post.title,
        content: Post.content,
        isPublished: Post.isPublished,
        authorId: "test"
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });
    if (!post) {
      return null;
    }
    return new PostEntity(
      post.id,
      post.title,
      post.content,
      post.isPublished,
      post.createdAt,
      post.updatedAt,
    )
  }
  // TODO: Define the Input type of the Post parameter
  async updatePost(id: string, Post: UpdatePostDto): Promise<PostEntity|null> {
    const post = await this.prismaService.post.update({
      where: {
        id: id
      },
      data: {
        title: Post.title,
        content: Post.content,
        isPublished: Post.isPublished
      }
    });
    if (!post) {
      return null;
    }
    return new PostEntity(
      post.id,
      post.title,
      post.content,
      post.isPublished,
      post.createdAt,
      post.updatedAt,
    )
  }

  async deletePost(id: string): Promise<boolean> {
    const post = await this.prismaService.post.delete({
      where: {
        id: id
      }
    });
    return post ? true : false;
  }
}
