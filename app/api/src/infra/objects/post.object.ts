import { Field,  ObjectType } from "@nestjs/graphql";
import { UserObject } from "./user.object";

@ObjectType()
export class PostObject {
  @Field((type) => String)
  id: string;

  @Field((type)=>String)
  title: string;

  @Field((type) => String)
  content: string;

  @Field((type) => UserObject, { nullable: true })
  author?: UserObject;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Date, { nullable: true })
  deletedAt?: Date;
}
