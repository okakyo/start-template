import { BadRequestException, NotFoundException, UsePipes } from "@nestjs/common";
import { Mutation, Resolver,Args} from "@nestjs/graphql";
import { ZodValidationPipe } from "src/config/zod.config";
import { CreatePostInput,UpdatePostInput } from "src/domains/dtos/post";
import { CreatePostDtoSchema, newCreatePostDto } from "src/domains/dtos/post/createPost.dto";
import { UpdatePostDtoSchema, newUpdatePostDto } from "src/domains/dtos/post/updatePost.dto";
import { PostId, newPostId } from "src/domains/entities/post.entity";
import { PostObject } from "src/infra/objects/post.object";
import { CreatePostUseCase, RemovePostUseCase, UpdatePostUseCase, findPostByIdUseCase } from "src/usecases/posts";
import * as v from 'valibot';

@Resolver(of => PostObject)
export class PostMutation {
  // Add your post mutations here
  constructor(
    private readonly findPostByIdUseCase: findPostByIdUseCase,
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly removePostUseCase: RemovePostUseCase,
  ) { }

  @Mutation(returns => PostObject)
  async createPost(@Args('post') post: CreatePostInput) {
    // TODO: Valitation を追加
    const input = newCreatePostDto(post);
    if (!input.success) {
      throw new BadRequestException(input.issues[0].message);
    };
    return await this.createPostUseCase.exec(input.output);
  }

  @Mutation(returns => PostObject)
  async updatePost(@Args('post') post: UpdatePostInput) {
    const inputPost = newUpdatePostDto(post);
    if (!inputPost.success) {
      throw new BadRequestException(inputPost.issues[0].message);
    }
    const input = inputPost.output;
    const searchedPost = await this.findPostByIdUseCase.exec(input.id);
    if (!searchedPost) {
      throw new NotFoundException(`Post:${input.id} not found`);
    }
    return await this.updatePostUseCase.exec(input);
  }

  @Mutation(returns => Boolean)
  async removePost(@Args('id') id: string) {
    const postId = newPostId(id);
    const targetPost = await this.findPostByIdUseCase.exec(postId);
    if (!targetPost) {
      throw new NotFoundException(`Post:${id} not found`);
    }
    return await this.removePostUseCase.exec(postId);
  }
}

