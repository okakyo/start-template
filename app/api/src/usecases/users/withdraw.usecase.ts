import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domains/interfaces/user.repository';
import { UserId } from 'src/domains/entities/user.entity';

@Injectable()
export class withdrawUseCase {
  constructor(
    private readonly useRepository: UserRepository
  ) {}
  async exec(id: UserId) {
    return await this.useRepository.withdraw(id);
  }
}
