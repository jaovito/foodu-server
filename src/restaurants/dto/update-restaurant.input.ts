import { CreateRestaurantInput } from './create-restaurant.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType({
  description:
    "It's the input to update the restaurant, need to fill the ID of the restaurant",
})
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field(() => String)
  id: string;
}
