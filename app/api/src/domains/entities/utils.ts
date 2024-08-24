import * as v from 'valibot';

export const paginationSchema = v.object({
  totalCount: v.optional(v.number()),
});

export const newPagination = (input: v.InferInput<typeof paginationSchema>) =>
  v.parse(paginationSchema, input);
