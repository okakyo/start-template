import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domains/interfaces/user.repository';
import { UpdateUserDto } from '../../domains/dtos/user';

@Injectable()
export class updateProfileUseCase {
  constructor(
    private readonly useRepository: UserRepository
  ) {}
  async exec(userInput:UpdateUserDto) {
    try {
      const user = await this.useRepository.getUserById(userInput.id);
      if (!user) {
        throw new NotFoundException(`User:${userInput.id} not found`);
      }

      return await this.useRepository.updateProfile(userInput);
    } catch (e) {
      throw e;
    }
  }
}
