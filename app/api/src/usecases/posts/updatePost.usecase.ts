import { Injectable } from '@nestjs/common';
import { UpdatePostDto } from 'src/domains/dtos/post/updatePost.dto';
import { PostRepository } from 'src/domains/interfaces';

@Injectable()
export class UpdatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}
  async exec(post: UpdatePostDto) {
    return await this.postRepository.updatePost(post);
  }
}
