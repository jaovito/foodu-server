import { InputType, Field, Float } from '@nestjs/graphql';
import { FoodSize, Prisma } from '@prisma/client';

@InputType()
export class CreateFoodInput
  implements Omit<Prisma.FoodCreateInput, 'restaurant'>
{
  @Field()
  name: string;

  @Field(() => Float)
  price: number;

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
