import { Field, ObjectType } from '@nestjs/graphql';
import { OffsetPaginatedObject } from './util';

@ObjectType()
export class PostObject {
  @Field(() => String)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  authorId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date, { nullable: true })
  deletedAt?: Date;
}

@ObjectType()
export class PaginatedPostObject extends OffsetPaginatedObject(PostObject) {}
