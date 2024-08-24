import { Injectable } from '@nestjs/common';
import { PostRepository } from '../../domains/interfaces/post.repository';
import { UserId } from 'src/domains/entities/user.entity';

@Injectable()
export class findPostsByAuthorIdUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async exec(userId: UserId) {
    const posts = await this.postRepository.findPostsByAuthorId(userId);
    return posts;
  }
}
