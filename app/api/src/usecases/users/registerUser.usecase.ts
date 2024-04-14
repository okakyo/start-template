import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domains/interfaces/user.repository';
import { CreateUserDto } from '../../domains/dtos/user/createUser.dto';

@Injectable()
export class registerUserUseCase {
  constructor(
    private readonly useRepository: UserRepository
  ) {}
  async exec(user: CreateUserDto) {
    return await this.useRepository.register(user);
  }
}
