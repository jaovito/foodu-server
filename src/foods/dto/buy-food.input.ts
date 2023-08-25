import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class BuyFoodInput {
  @Field()
  food_id: string;

  @Field()
  user_id: string;

  @Field()
  delivery_time: string;

  @Field(() => Int)
  counter: number;
}
