import { InputType, Field } from '@nestjs/graphql';
import { FoodSize, Prisma } from '@prisma/client';

@InputType()
export class CreateFoodInput
  implements Omit<Prisma.FoodCreateInput, 'restaurant'>
{
  @Field()
  name: string;

  @Field()
  about: string;

  @Field(() => FoodSize, { nullable: true })
  size?: FoodSize;

  @Field()
  energy: string;

  @Field()
  restaurant_id: string;

  @Field(() => [String])
  categories: string[];
}
