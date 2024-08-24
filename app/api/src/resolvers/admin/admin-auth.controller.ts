import {
  BadRequestException,
  Controller,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { newOffsetPaginationArgs } from 'src/domains/dtos/utils/pagination.dto';
import { newPostIdInput } from 'src/domains/entities/post.entity';
import { findPostByIdUseCase } from 'src/usecases/posts';
import { adminGetAllPostsUseCase } from 'src/usecases/posts/adminGetAllPosts.usecase';

@Controller('admin/auth')
export class AdminPostController {
  constructor(
    private readonly adminGetAllPostsUsecase: adminGetAllPostsUseCase,
    private readonly findPostByIdUseCase: findPostByIdUseCase,
  ) {}

  @Post('/login')
  async adminLogin(
    @Query('_start') start: number,
    @Query('_end') end: number,
    @Res() res: Response,
  ) {
    const parsedStart = Number(start);
    const parsedEnd = Number(end);
    const skip = parsedStart;
    const take = parsedEnd - parsedStart;
    const parsedPatination = newOffsetPaginationArgs({ skip, take });
    if (!parsedPatination.success) {
      throw new BadRequestException(parsedPatination.issues);
    }
    const { nodes, totalCount } = await this.adminGetAllPostsUsecase.exec(
      parsedPatination.output,
    );
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('x-total-count', totalCount.toString());
    return res.send(nodes);
  }

  @Post('/logout')
  async adminLogout(@Param('id') id: string) {
    const postId = newPostIdInput(id);
    if (!postId.success) {
      throw new BadRequestException(postId.issues);
    }
    const post = await this.findPostByIdUseCase.exec(postId.output);
    if (!post) {
      throw new NotFoundException('User not found');
    }
    return post;
  }
}
