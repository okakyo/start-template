import { IUser, UserEntity } from "src/domains/entities/user.entity";

export interface IPost {
  id: string;
  title: string;
  content: string;
  author?: IUser;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export class PostEntity {
  id: string;
  title: string;
  content: string;
  author?: IUser;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, title: string, content: string,isPublished:boolean,  createdAt: Date, updatedAt: Date, author?:IUser,) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.isPublished = isPublished;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    if (author) {
      this.author = new UserEntity(author);
    }
  }
}
