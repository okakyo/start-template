import { Field, InputType } from "@nestjs/graphql";
import { userIdSchema } from "src/domains/entities/user.entity";
import * as v from "valibot";

export const CreatePostDtoSchema = v.object({
  title: v.pipe(v.string(),v.minLength(1), v.maxLength(255)),
  content: v.pipe(v.string(), v.minLength(1), v.maxLength(5000)),
  authorId: userIdSchema,
  isPublished: v.optional(v.boolean())
});

export type CreatePostDto = v.InferOutput<typeof CreatePostDtoSchema>;
export const newCreatePostDto = (input: v.InferInput<typeof CreatePostDtoSchema>) => v.safeParse(CreatePostDtoSchema, input);

@InputType()
export class CreatePostInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  content: string;

  @Field({ nullable: false })
  authorId: string;

  @Field({ nullable: true, defaultValue: false })
  isPublished?: boolean;
}
