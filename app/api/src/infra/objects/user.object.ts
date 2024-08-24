import { Field, ObjectType } from '@nestjs/graphql';
import { OffsetPaginatedObject } from './util';

@ObjectType()
export class UserObject {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  thumbnailUrl?: string;
}

@ObjectType()
export class UserDetailObject extends UserObject {
  @Field(() => String)
  email: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class PaginatedUserDetailObject extends OffsetPaginatedObject(
  UserDetailObject,
) {}
