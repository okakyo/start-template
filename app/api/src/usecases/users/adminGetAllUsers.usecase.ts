import { Injectable } from "@nestjs/common";
import { PaginationArgs } from "src/domains/dtos/utils/pagination.dto";
import { UserRepository } from "src/domains/interfaces";

@Injectable()
export class adminGetAllUsersUsecase {
  constructor(
    private readonly useRepository: UserRepository
  ) { }

  async exec(pagination: PaginationArgs) {
    return await this.useRepository.adminGetAllUsers(pagination);
  }
};
