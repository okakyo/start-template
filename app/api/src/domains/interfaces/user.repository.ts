import { UserObject } from '../../infra/objects/user.object';
import { CreateUserDto,UpdateUserDto } from '../dtos/user';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract getUserById(id: string): Promise<UserEntity|null>;
  abstract getUserProfile(id: string): Promise<UserEntity|null>;
  abstract register(user: CreateUserDto): Promise<UserEntity>;
  abstract updateProfile(id: string, user: UpdateUserDto): Promise<UserEntity>;
  abstract withdraw(id: string): Promise<boolean>;
  // TODO: 権限を更新する関数を追加する
}

