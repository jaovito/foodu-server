import { InputType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType()
export class CreateCategoryInput implements Prisma.CategoryCreateInput {
  @Field()
  name: string;
}
