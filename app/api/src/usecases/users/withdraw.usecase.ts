import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domains/interfaces/user.repository';

@Injectable()
export class withdrawUseCase {
  constructor(
    private readonly useRepository: UserRepository
  ) {}
  async exec(id: string) {
    return await this.useRepository.withdraw(id);
  }
}
