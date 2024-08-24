import { CreatePostDto } from '../dtos/post';
import { UpdatePostDto } from '../dtos/post/updatePost.dto';
import { OffsetPaginationArgs } from '../dtos/utils/pagination.dto';
import { AdminPosts, PostEntity, PostId } from '../entities/post.entity';
import { UserId } from '../entities/user.entity';

export abstract class PostRepository {
  abstract adminGetAllPosts(
    pagination: OffsetPaginationArgs,
  ): Promise<AdminPosts>;
  abstract findPosts(): Promise<PostEntity[]>;
  abstract findPostById(id: PostId): Promise<PostEntity | null>;
  abstract findPostsByAuthorId(authorId: UserId): Promise<PostEntity[]>;
  abstract createPost(Post: CreatePostDto): Promise<PostEntity | null>;
  abstract updatePost(Post: UpdatePostDto): Promise<PostEntity | null>;
  abstract deletePost(id: PostId): Promise<boolean>;
}
