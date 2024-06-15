import { Injectable, NotFoundException, UsePipes } from "@nestjs/common";
import { PostRepository } from "../../domains/interfaces/post.repository";
import { CreatePostDto } from "src/domains/dtos/post";
import { ZodValidationPipe } from "src/config/zod.config";
import { CreatePostDtoSchema } from "src/domains/dtos/post/createPost.dto";
import { UserRepository } from "src/domains/interfaces";
import { newUserId } from "src/domains/entities/user.entity";

@Injectable()
export class CreatePostUseCase {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository
  ) { }
  async exec(post: CreatePostDto) {
    try {
      const { authorId } = post;
      const userId = newUserId(authorId)
      const author = await this.userRepository.getUserById(authorId);
      // TODO: アカウントのチェックを行う機能を追加する(本人なのか、権限があるかどうかのチェック)
      if (!author) {
        throw new NotFoundException(`User:${authorId} not found`);
      }

      return await this.postRepository.createPost(post);
    } catch (e) {
      throw e;
    }
  }
}
