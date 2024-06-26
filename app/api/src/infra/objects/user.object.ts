import { Field, ObjectType } from "@nestjs/graphql";
import { OffsetPaginatedObject } from "./util";


@ObjectType()
export class UserObject {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  name: string;


}

@ObjectType()
export class UserDetailObject extends UserObject {

  @Field((type) => String)
  email: string;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}

@ObjectType()
export class PaginatedUserDetailObject extends OffsetPaginatedObject(UserDetailObject) {}
