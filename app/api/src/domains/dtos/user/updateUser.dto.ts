import { Field, InputType } from '@nestjs/graphql';
import { userIdSchema } from 'src/domains/entities/user.entity';
import * as v from 'valibot';

export const UpdateUserDtoSchema = v.strictObject({
  id: userIdSchema,
  name: v.pipe(v.string(), v.minLength(1), v.maxLength(255)),
  email: v.pipe(v.string(), v.email()),
});

export type UpdateUserDto = v.InferOutput<typeof UpdateUserDtoSchema>;
export const newUpdateUserDto = (
  input: v.InferInput<typeof UpdateUserDtoSchema>,
) => v.safeParse(UpdateUserDtoSchema, input);

@InputType()
export class UpdateUserInput {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;
}
