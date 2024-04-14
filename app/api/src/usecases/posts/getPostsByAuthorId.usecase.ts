import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../domains/interfaces/post.repository';
import { PostEntity } from '../../domains/entities/post.entity';

@Injectable()
export class getPostsByAuthorIdUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ){}
  async exec(id: string) {
    const posts = await this.postRepository.getPostsByAuthorId(id);
    return posts.map((post) => new PostEntity(
      post.id,
      post.title,
      post.content,
      post.isPublished,
      post.createdAt,
      post.updatedAt,
      post.author
    ));
  }
}
