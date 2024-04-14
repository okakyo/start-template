
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domains/interfaces/user.repository';

@Injectable()
export class getUserDetailUseCase {
  constructor(
    private readonly useRepository: UserRepository
  ) {}
  async exec(id:string) {
    const user =  await this.useRepository.getUserById(id);
    if (!user) {
      return null;
    }
    return user;
  }
}
