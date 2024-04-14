import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../config/prisma/prisma.service";
import { UserRepository } from "../../domains/interfaces/user.repository";
import { UserEntity } from "../../domains/entities/user.entity";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    private  prismaService: PrismaService
  ) { }

  async getUserProfile(id: string): Promise<UserEntity | null>{
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
      include: { posts: true }
    })
    if (!user) {
      return null;
    }
    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }

  async getUserById(id: string): Promise<UserEntity | null>{
    const user = await this.prismaService.user.findUnique({
      where: { id: id },
    })
    if (!user) {
      return null;
    }
    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  }
  async register(user) {
    const newUser = await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
      }
    });

    return new UserEntity({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    });
  }

  async updateProfile(id: string, user) {
    const updatedUser = await this.prismaService.user.update({
      where: { id: id },
      data: {
        name: user.name,
        email: user.email,
      }
    });
    return new UserEntity({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    });
  }

  async withdraw(id: string) {
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
