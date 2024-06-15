import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../config/prisma.service";
import { UserRepository } from "../../domains/interfaces/user.repository";
import {  UserDetailEntity, UserEntity, UserId, newUserDetailEntity, newUserEntity  } from "../../domains/entities/user.entity";
import { newPostEntity } from "src/domains/entities/post.entity";
import { CreateUserDto, UpdateUserDto } from "src/domains/dtos/user";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    private  prismaService: PrismaService
  ) { }

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
