import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../domains/interfaces/post.repository';

@Injectable()
export class getPostByIdUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ){}
  async exec(id: string) {
    const post = await this.postRepository.getPostById(id);
    if (!post) {
      return null;
    }
    return post;
  }
}
