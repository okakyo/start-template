import * as v from 'valibot'

export const paginationSchema = v.object({
  totalPages: v.optional(v.number()),
  hasNextPage: v.optional(v.boolean()),
});

export const newPagination = (input: v.InferInput<typeof paginationSchema>) => v.parse(paginationSchema, input);

