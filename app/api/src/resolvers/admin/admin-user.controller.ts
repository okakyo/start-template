import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { newOffsetPaginationArgs } from 'src/domains/dtos/utils/pagination.dto';
import { newUserIdInput } from 'src/domains/entities/user.entity';
import {
  adminGetAllUsersUsecase,
  getUserProfileUseCase,
  registerUserUseCase,
  updateProfileUseCase,
  withdrawUseCase,
} from 'src/usecases/users';

@Controller('admin/users')
export class AdminUserController {
  constructor(
    private readonly adminGetAllUsersUsecase: adminGetAllUsersUsecase,
    private readonly adminGetUserUsecase: getUserProfileUseCase,
    private readonly registerUserUsecase: registerUserUseCase,
    private readonly updateProfileUsecase: updateProfileUseCase,
    private readonly withdrawUsecase: withdrawUseCase,
  ) {}

  @Get('')
  async adminGetAllUsers(
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
    const { nodes, totalCount } = await this.adminGetAllUsersUsecase.exec(
      parsedPatination.output,
    );
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    res.header('x-total-count', totalCount.toString());
    return res.send(nodes);
  }

  @Get(':id')
  async adminGetUser(@Param('id') id: string, @Res() res: Response) {
    const userId = newUserIdInput(id);
    if (!userId.success) {
      throw new BadRequestException(userId.issues);
    }
    const user = await this.adminGetUserUsecase.exec(userId.output);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return res.send(user);
  }
}
