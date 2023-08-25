import { InputType, Field, Float } from '@nestjs/graphql';

@InputType({
  description:
    "It's the input used to find all restaurants using the proximity (latitude and longitude)",
})
export class FindAllRestaurantsInput {
  @Field(() => Float, {
    nullable: true,
    description: "It's the use latitude",
  })
  latitude: number;

  @Field(() => Float, { nullable: true, description: "It's the use longitude" })
  longitude: number;

  @Field(() => [String], {
    nullable: true,
    description:
      "It's the categories of the restaurant, the categories can be null",
  })
  categories: string[];
}
