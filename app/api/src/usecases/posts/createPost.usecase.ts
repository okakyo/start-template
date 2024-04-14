import { Injectable } from "@nestjs/common";
import { PostRepository } from "../../domains/interfaces/post.repository";
import { CreatePostDto } from "src/domains/dtos/post";

@Injectable()
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ) {}
  async exec(post:CreatePostDto) {
    return await this.postRepository.createPost(post);
  }
}
