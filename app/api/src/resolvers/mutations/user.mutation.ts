import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserObject } from '../../infra/objects/user.object';
import {
  registerUserUseCase,
  updateProfileUseCase,
  withdrawUseCase,
} from '../../usecases/users';
import {
  CreateUserDto,
  CreateUserInput,
  UpdateUserDto,
  UpdateUserInput,
} from '../../domains/dtos/user';
import { newUserEntity, newUserId } from 'src/domains/entities/user.entity';
import { newCreateUserDto } from 'src/domains/dtos/user/createUser.dto';
import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  UpdateUserDtoSchema,
  newUpdateUserDto,
} from 'src/domains/dtos/user/updateUser.dto';
import { JwtAuthGuard } from 'src/libs/auth/jwt.guard';

@Resolver((of) => UserObject)
export class UserMutation {
  constructor(
    private readonly registerUserUseCase: registerUserUseCase,
    private readonly updateProfileUseCase: updateProfileUseCase,
    private readonly withdrawUseCase: withdrawUseCase,
  ) {}

  @Mutation((returns) => UserObject, { name: 'registerUser', nullable: true })
  async registerUser(
    @Args('user', {
      type: () => CreateUserInput,
    })
    user: CreateUserInput,
  ) {
    const input = newCreateUserDto(user);
    if (!input.success) {
      throw new BadRequestException(input.issues[0].message);
    }
    return await this.registerUserUseCase.exec(input.output);
  }

  // TODO: 認証が必要（本人、あるいは管理者権限
  @Mutation((returns) => UserObject, { name: 'updateProfile', nullable: true })
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Args('user') user: UpdateUserInput) {
    const parsedUser = newUpdateUserDto(user);
    if (!parsedUser.success) {
      throw new BadRequestException(parsedUser.issues[0].message);
    }
    return await this.updateProfileUseCase.exec(parsedUser.output);
  }

  // TODO: 認証が必要（本人、あるいは管理者権限
  @Mutation((returns) => Boolean, { name: 'removeUser', nullable: true })
  @UseGuards(JwtAuthGuard)
  async withdraw(@Args('id') id: string) {
    const parsedUserId = newUserId(id);
    return await this.withdrawUseCase.exec(parsedUserId);
  }
}
