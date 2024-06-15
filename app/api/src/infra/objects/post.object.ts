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

  @Field((type) => String)
  authorId: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Date, { nullable: true })
  deletedAt?: Date;
}
