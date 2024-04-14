import { Field, InputType } from "@nestjs/graphql";

export interface CreateUserDto  {
  name: string,
  email: string,
}

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;
}

