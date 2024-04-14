export interface IUser {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  posts?: any[];
}


export class UserEntity {
  id: string;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  posts?: any[];

  constructor(user: IUser) {
    this.id = user.id,
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    if(user.posts) {
      this.posts = user.posts;
    }
  }
}
