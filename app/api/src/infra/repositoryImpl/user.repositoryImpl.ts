import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../libs/config/prisma.service';
import { UserRepository } from '../../domains/interfaces/user.repository';
import {
  AdminUserDetails,
  UserDetailEntity,
  UserEntity,
  UserId,
  newAdminUserDetails,
  newUserDetailEntity,
  newUserEntity,
} from '../../domains/entities/user.entity';
import { newPostEntity } from 'src/domains/entities/post.entity';
import { CreateUserDto, UpdateUserDto } from 'src/domains/dtos/user';
import { newPagination } from 'src/domains/entities/utils';
import { OffsetPaginationArgs } from 'src/domains/dtos/utils/pagination.dto';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  // TODO: アカウント権限で取得できるようにすること、チームごとのユーザーで取得できるようにすること
  async adminGetAllUsers(
    pagination: OffsetPaginationArgs,
  ): Promise<AdminUserDetails> {
    const { skip, take } = pagination;

    const [users, totalCount] = await Promise.all([
      this.prismaService.user.findMany({
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prismaService.user.count(),
    ]);

    const parsedUsers = users.map((user) =>
      newUserDetailEntity({
        id: user.id,
        name: user.name,
        email: user.email,
        thumbnailUrl: user.thumbnailUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }),
    );

    const parsedPagination = newPagination({
      totalCount,
    });
    const response = newAdminUserDetails({
      ...parsedPagination,
      nodes: parsedUsers,
    });
    return response;
  }

  async getUserProfile(id: UserId): Promise<UserDetailEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return null;
    }
    return newUserDetailEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      thumbnailUrl: user.thumbnailUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async getUserById(id: UserId): Promise<UserEntity | null> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    });
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
      },
    });
    if (!newUser) return null;

    return newUserDetailEntity({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      thumbnailUrl: newUser.thumbnailUrl,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });
  }

  async updateProfile(user: UpdateUserDto): Promise<UserDetailEntity | null> {
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
      },
    });
    if (!updatedUser) {
      return null;
    }
    return newUserDetailEntity({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      thumbnailUrl: updatedUser.thumbnailUrl,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  }

  async withdraw(id: UserId): Promise<boolean> {
    const deletedUser = await this.prismaService.user.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
    if (deletedUser.id === id) {
      return true;
    }
    return false;
  }
}
