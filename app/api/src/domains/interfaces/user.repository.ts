import { UserObject } from '../../infra/objects/user.object';
import { CreateUserDto,UpdateUserDto } from '../dtos/user';
import { UserDetailEntity, UserEntity, UserId } from '../entities/user.entity';

export abstract class UserRepository {
  abstract getUserById(id: UserId): Promise<UserEntity|null>;
  abstract getUserProfile(id: UserId): Promise<UserDetailEntity|null>;
  abstract register(user: CreateUserDto): Promise<UserEntity>;
  abstract updateProfile( user: UpdateUserDto): Promise<UserEntity>;
  abstract withdraw(id: UserId): Promise<boolean>;
  // TODO: 権限を更新する関数を追加する
}

