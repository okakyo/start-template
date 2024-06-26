import * as v from "valibot";
import { paginationSchema } from "./utils";
export const userIdSchema = v.pipe(v.string(), v.brand("userId"));
export type UserId = v.InferOutput<typeof userIdSchema>;
export const newUserId = (input: v.InferInput<typeof userIdSchema>) => v.parse(userIdSchema,input);

export const userEntitySchema = v.object({
  id:  userIdSchema,
  name: v.string(),
});
export type UserEntity = v.InferOutput<typeof userEntitySchema>
export const newUserEntity = (input: v.InferInput<typeof userEntitySchema>) => v.parse(userEntitySchema, input);

export const userDetailEntitySchema = v.object({
  ...userEntitySchema.entries,
  email: v.pipe(v.string(),v.email()),
  createdAt: v.date(),
  updatedAt: v.date(),
});

export type UserDetailEntity = v.InferOutput<typeof userDetailEntitySchema>;
export const newUserDetailEntity = (input:v.InferInput<typeof userDetailEntitySchema>) => v.parse(userDetailEntitySchema,input)

export const AdminUserDetailsSchema = v.object({
  ...paginationSchema.entries,
  items: v.array(userDetailEntitySchema),
})

export type AdminUserDetails = v.InferOutput<typeof AdminUserDetailsSchema>;
export const newAdminUserDetails = (input: v.InferInput<typeof AdminUserDetailsSchema>) => v.parse(AdminUserDetailsSchema, input);
