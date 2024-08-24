import { Field, InputType, Int } from '@nestjs/graphql';

import * as v from 'valibot';

export const OffsetPaginationArgsDtoSchema = v.strictObject({
  skip: v.optional(v.number()),
  take: v.pipe(v.optional(v.number()), v.minValue(1)),
});

export type OffsetPaginationArgsDto = v.InferOutput<
  typeof OffsetPaginationArgsDtoSchema
>;
export const newOffsetPaginationArgs = (
  input: v.InferInput<typeof OffsetPaginationArgsDtoSchema>,
) => v.safeParse(OffsetPaginationArgsDtoSchema, input);

@InputType()
export class OffsetPaginationArgs {
  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => Int, { nullable: true })
  take?: number;
}
