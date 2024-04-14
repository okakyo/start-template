import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domains/interfaces/user.repository';
import { UpdateUserDto } from '../../domains/dtos/user';

@Injectable()
export class updateProfileUseCase {
  constructor(
    private readonly useRepository: UserRepository
  ) {}
  async exec(id: string,user:UpdateUserDto) {
    return await this.useRepository.updateProfile(id,user);
  }
}
