import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IOffsetPaginatedType<T> {
  items: T[];
  totalPages: number;
  hasNextPage: boolean;
}

export interface ICursorPaginatedType<T> {
  edges: IEdgeType<T>[];
  totalPages: number;
  hasNextPage: boolean;
}

export function OffsetPaginatedObject<T>(classRef: Type<T>): Type<IOffsetPaginatedType<T>> {


  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IOffsetPaginatedType<T> {
    @Field((type) => [classRef], { nullable: true })
    items: T[];

    @Field((type) => Int)
    totalPages: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType as Type<IOffsetPaginatedType<T>>;
}

export function CursorBasedPaginatedObject<T>(classRef: Type<T>): Type<ICursorPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field((type) => String)
    cursor: string;

    @Field((type) => classRef)
    node: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements ICursorPaginatedType<T> {
    @Field((type) => [EdgeType], { nullable: true })
    edges: EdgeType[];

    @Field((type) => Int)
    totalPages: number;

    @Field()
    hasNextPage: boolean;
  }
  return PaginatedType as Type<ICursorPaginatedType<T>>;
}
