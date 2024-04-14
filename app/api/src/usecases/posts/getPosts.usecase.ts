import { Injectable } from "@nestjs/common";
import { PostRepository } from "../../domains/interfaces/post.repository";

@Injectable()
export class getPostsUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ) {}
  async exec() {
    return await this.postRepository.getPosts();
  }
}
