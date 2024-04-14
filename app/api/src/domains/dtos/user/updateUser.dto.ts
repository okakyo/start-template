import { Field, InputType } from "@nestjs/graphql";


export interface UpdateUserDto  {
  name?: string,
  email?: string,
}

@InputType()
export class UpdateUserInput {
  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  email?: string;
}
