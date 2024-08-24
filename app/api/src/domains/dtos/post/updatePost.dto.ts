import { Field, InputType } from '@nestjs/graphql';
import { postIdSchema } from 'src/domains/entities/post.entity';
import * as v from 'valibot';

export const UpdatePostDtoSchema = v.object({
  id: postIdSchema,
  title: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
  content: v.pipe(v.string(), v.minLength(1), v.maxLength(5000)),
  isPublished: v.optional(v.boolean()),
});

export type UpdatePostDto = v.InferOutput<typeof UpdatePostDtoSchema>;
export const newUpdatePostDto = (
  input: v.InferInput<typeof UpdatePostDtoSchema>,
) => v.safeParse(UpdatePostDtoSchema, input);

@InputType()
export class UpdatePostInput {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  content: string;

  @Field({ nullable: true, defaultValue: false })
  isPublished?: boolean;
}
