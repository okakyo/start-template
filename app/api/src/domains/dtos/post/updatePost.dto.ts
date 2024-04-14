import { Field, InputType } from "@nestjs/graphql";

export class UpdatePostDto {
  title: string;
  content: string;
  isPublished?: boolean;
}

@InputType()
export class UpdatePostInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  content: string;

  @Field({ nullable: true, defaultValue: false })
  isPublished?: boolean;
}
