import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindFoodInput {
  @Field()
  restaurant_id: string;

  @Field(() => [String], { nullable: true })
  categories: string[];
}
