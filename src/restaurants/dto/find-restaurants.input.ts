import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class FindAllRestaurantsInput {
  @Field(() => Float, { nullable: true })
  latitude: number;

  @Field(() => Float, { nullable: true })
  longitude: number;

  @Field(() => [String], { nullable: true })
  categories: string[];
}
