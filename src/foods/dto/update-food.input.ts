import { CreateFoodInput } from './create-food.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFoodInput extends PartialType(CreateFoodInput) {
  @Field(() => String)
  id: string;
}
