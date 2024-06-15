import { Injectable, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/libs/config/zod.config";
import { UpdatePostDto, UpdatePostDtoSchema } from "src/domains/dtos/post/updatePost.dto";
import { PostRepository } from "src/domains/interfaces";

@Injectable()
export class UpdatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository
  ) {}
  async exec(post: UpdatePostDto) {
    return await this.postRepository.updatePost(post);
  }
}
