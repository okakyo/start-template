import {
  UserEntity,
  userEntitySchema,
  userIdSchema,
} from 'src/domains/entities/user.entity';
import * as v from 'valibot';
import { paginationSchema } from './utils';

export const postIdSchema = v.pipe(v.string(), v.brand('postId'));
export type PostId = v.InferOutput<typeof postIdSchema>;
export const newPostId = (input: v.InferInput<typeof postIdSchema>) =>
  v.parse(postIdSchema, input);
export const newPostIdInput = (input: v.InferInput<typeof postIdSchema>) =>
  v.safeParse(postIdSchema, input);

export const postEntitySchema = v.strictObject({
  id: postIdSchema,
  title: v.string(),
  content: v.string(),
  isPublished: v.optional(v.boolean(), false),
  authorId: userIdSchema,
  createdAt: v.date(),
  updatedAt: v.date(),
  deletedAt: v.nullable(v.date()),
});

export type PostEntity = v.InferOutput<typeof postEntitySchema>;
export const newPostEntity = (input: v.InferInput<typeof postEntitySchema>) =>
  v.parse(postEntitySchema, input);

export const AdminPostsSchema = v.object({
  ...paginationSchema.entries,
  nodes: v.array(postEntitySchema),
});

export type AdminPosts = v.InferOutput<typeof AdminPostsSchema>;
export const newAdminPosts = (input: v.InferInput<typeof AdminPostsSchema>) =>
  v.parse(AdminPostsSchema, input);
