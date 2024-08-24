import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../domains/interfaces/post.repository';
import { PostId } from 'src/domains/entities/post.entity';

@Injectable()
export class findPostByIdUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async exec(id: PostId) {
    const post = await this.postRepository.findPostById(id);
    if (!post) {
      return null;
    }
    return post;
  }
}
