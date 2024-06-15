import { PrismaService } from "src/config/prisma.service";
import { PostRepository } from "../../domains/interfaces/post.repository";
import { PostEntity, PostId, newPostEntity } from "../../domains/entities/post.entity";
import { Injectable } from "@nestjs/common";
import { CreatePostDto, UpdatePostDto } from "src/domains/dtos/post";

@Injectable()
export class PostRepositoryImpl implements PostRepository {
  constructor(
    private readonly prismaService: PrismaService
  ){}
  async findPosts() {
    const posts = await this.prismaService.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
    });
    return posts.map((post) => {
      return newPostEntity(post);
    })
  }
  async findPostById(id: string): Promise<PostEntity|null> {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: id
      },
    });
    if (!post) {
      return null;
    }
    return newPostEntity(post);
  }

  async findPostsByAuthorId(authorId: string): Promise<PostEntity[]> {
    const posts = await this.prismaService.post.findMany({
      where: {
        authorId: authorId
      },
    });
    return posts.map((post) => {
      return newPostEntity(post);
    });
  }

  async createPost(Post: CreatePostDto): Promise<PostEntity|null> {
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
    return newPostEntity(post);
  }
  // TODO: Define the Input type of the Post parameter
  async updatePost(input: UpdatePostDto): Promise<PostEntity|null> {
    const { id, ...data } = input;
    const updatedPost = await this.prismaService.post.update({
      where: {
        id: id
      },
      data
    });
    if (!updatedPost) {
      return null;
    }
    return newPostEntity(updatedPost);
  }

  async deletePost(id: PostId): Promise<boolean> {
    const post = await this.prismaService.post.delete({
      where: {
        id: id
      }
    });
    return post ? true : false;
  }
}
