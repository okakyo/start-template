import { Injectable } from '@nestjs/common';
import { OffsetPaginationArgs } from 'src/domains/dtos/utils/pagination.dto';
import { UserRepository } from 'src/domains/interfaces';

@Injectable()
export class adminGetAllUsersUsecase {
  constructor(private readonly useRepository: UserRepository) {}

  async exec(pagination: OffsetPaginationArgs) {
    return await this.useRepository.adminGetAllUsers(pagination);
  }
}
