import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File {
  @Field()
  id: string;

  @Field()
  file_key: string;

  @Field()
  file_url: string;
}
