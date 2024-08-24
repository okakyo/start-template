import { Injectable } from '@nestjs/common';
import { OffsetPaginationArgs } from 'src/domains/dtos/utils/pagination.dto';
import { PostRepository } from 'src/domains/interfaces';

@Injectable()
export class adminGetAllPostsUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async exec(pagination: OffsetPaginationArgs) {
    return await this.postRepository.adminGetAllPosts(pagination);
  }
}
