import { CreatePostDto } from "../dtos/post";
import { UpdatePostDto } from "../dtos/post/updatePost.dto";
import { PostEntity } from "../entities/post.entity";

export abstract class PostRepository {
  abstract getPosts(): Promise<PostEntity[]>;
  abstract getPostById(id: string): Promise<PostEntity|null>;
  abstract getPostsByAuthorId(authorId: string): Promise<PostEntity[]>;
  abstract createPost(Post: CreatePostDto): Promise<PostEntity|null>;
  abstract updatePost(id: string, Post: UpdatePostDto): Promise<PostEntity|null>;
  abstract deletePost(id: string): Promise<boolean>;
}
