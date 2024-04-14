import { Injectable } from "@nestjs/common";
import { PostRepository } from "src/domains/interfaces";

@Injectable()
export class RemovePostUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ) {}
  async exec(id: string) {
    // 以下のケースを追加
    return await this.postRepository.deletePost(id);
  }
}
