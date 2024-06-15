import { Field, InputType } from "@nestjs/graphql";
import * as v from "valibot";

export const CreateUserDtoSchema = v.strictObject({
  name: v.pipe(v.string(),v.minLength(1),v.maxLength(255)),
  email: v.pipe(v.string(),v.email())
});

export type CreateUserDto = v.InferOutput<typeof CreateUserDtoSchema>;
export const newCreateUserDto = (input: v.InferInput<typeof CreateUserDtoSchema>) =>v.safeParse(CreateUserDtoSchema,input);

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;
}

