import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../libs/config/prisma.service";
import { UserRepository } from "../../domains/interfaces/user.repository";
import {  AdminUserDetails, UserDetailEntity, UserEntity, UserId, newAdminUserDetails, newUserDetailEntity, newUserEntity  } from "../../domains/entities/user.entity";
import { newPostEntity } from "src/domains/entities/post.entity";
import { CreateUserDto, UpdateUserDto } from "src/domains/dtos/user";
import { newPagination } from "src/domains/entities/utils";
import { PaginationArgs } from "src/domains/dtos/utils/pagination.dto";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    private  prismaService: PrismaService
  ) { }

  // TODO: アカウント権限で取得できるようにすること、チームごとのユーザーで取得できるようにすること
  async adminGetAllUsers(pagination: PaginationArgs): Promise<AdminUserDetails> {
    const { page, perPage } = pagination;

    const take = perPage ? perPage : 10;
    const skip = page ? (page - 1) * take : 0;
    const [users, totalCount] = await Promise.all([
      this.prismaService.user.findMany({
        take,
        skip,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      this.prismaService.user.count()
    ]);
    const parsedUsers = users.map(user => newUserDetailEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = page < totalPages;

    const parsedPagination = newPagination({
      totalPages,
      hasNextPage,
    })

    return newAdminUserDetails({
      ...parsedPagination,
      items: parsedUsers,
    })
  }

  async getUserProfile(id: UserId): Promise<UserDetailEntity | null>{
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    })
    if (!user) {
      return null;
    }
    return newUserDetailEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    })
  }

  async getUserById(id: UserId): Promise<UserEntity | null>{
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    })
    if (!user) {
      return null;
    }
    return newUserEntity({
      id: user.id,
      name: user.name,
    });
  }
  async register(user: CreateUserDto): Promise<UserDetailEntity | null> {
    const newUser = await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
      }
    });
    if(!newUser) return null;

    return newUserDetailEntity({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    })
  }

  async updateProfile(user: UpdateUserDto): Promise<UserDetailEntity | null> {
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
      }
    });
    if (!updatedUser) {
      return null;
    }
    return newUserDetailEntity({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    })
  }

  async withdraw(id: UserId): Promise<boolean> {
    const deletedUser = await this.prismaService.user.update({
      where: { id: id },
      data: {
        deletedAt: new Date()
      }
    });
    if (deletedUser.id === id) {
      return true;
    }
    return false;
  }
}
