import {  UserEntity, userEntitySchema, userIdSchema } from "src/domains/entities/user.entity";
import * as v from "valibot";

export const postIdSchema = v.pipe(v.string(), v.brand("postId"))
export type PostId = v.InferOutput<typeof postIdSchema>
export const newPostId = (input: v.InferInput<typeof postIdSchema>) => v.parse(postIdSchema, input);

export const postEntitySchema = v.strictObject({
  id: postIdSchema,
  title: v.string(),
  content: v.string(),
  isPublished: v.optional(v.boolean(), false),
  createdAt: v.date(),
  updatedAt: v.date(),
});

export type PostEntity = v.InferOutput<typeof postEntitySchema>;
export const newPostEntity = (input: v.InferInput<typeof postEntitySchema>) => v.parse(postEntitySchema, input);
