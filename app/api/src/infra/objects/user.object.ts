import { Field, ObjectType } from "@nestjs/graphql";


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

