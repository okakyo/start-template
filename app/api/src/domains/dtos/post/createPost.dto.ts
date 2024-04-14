import { Field, InputType } from "@nestjs/graphql";

export class CreatePostDto {
  title: string;
  content: string;
  isPublished?: boolean;
}

@InputType()
export class CreatePostInput {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  content: string;

  @Field({ nullable: true, defaultValue: false })
  isPublished?: boolean;
}
