
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domains/interfaces/user.repository';
import { UserId } from 'src/domains/entities/user.entity';

@Injectable()
export class getUserProfileUseCase {
  constructor(
    private readonly useRepository: UserRepository
  ) {}
  async exec(id:UserId) {
    const user =  await this.useRepository.getUserProfile(id);
    if (!user) {
      return null;
    }
    return user;
  }
}
