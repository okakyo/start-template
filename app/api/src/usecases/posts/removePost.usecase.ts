import { Injectable } from "@nestjs/common";
import { PostId } from "src/domains/entities/post.entity";
import { PostRepository } from "src/domains/interfaces";

@Injectable()
export class RemovePostUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ) {}
  async exec(id: PostId) {
    // 以下のケースを追加
    return await this.postRepository.deletePost(id);
  }
}
