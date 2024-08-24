import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IOffsetPaginatedType<T> {
  nodes: T[];
  totalCount: number;
  hasNextPage: boolean;
}

export interface ICursorPaginatedType<T> {
  edges: IEdgeType<T>[];
  totalCount: number;
  hasNextPage: boolean;
}

export function OffsetPaginatedObject<T>(
  classRef: Type<T>,
): Type<IOffsetPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IOffsetPaginatedType<T> {
    @Field(() => [classRef], { nullable: true })
    nodes: T[];

    @Field(() => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType as Type<IOffsetPaginatedType<T>>;
}

export function CursorBasedPaginatedObject<T>(
  classRef: Type<T>,
): Type<ICursorPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements ICursorPaginatedType<T> {
    @Field(() => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field(() => Int)
    totalCount: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType as Type<ICursorPaginatedType<T>>;
}
