import { InputType, Field, Float } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@InputType({
  description:
    "It's the input to create a restaurant, the restaurant only can be created by one administrator or chef.",
})
export class CreateRestaurantInput implements Prisma.RestaurantCreateInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  about: string;

  @Field()
  address: string;

  @Field()
  uf: string;

  @Field()
  city: string;

  @Field()
  neighbourhood: string;

  @Field(() => Float, { nullable: true })
  longitude: number;

  @Field(() => Float, { defaultValue: 10 })
  max_distance: number;

  @Field(() => Float, { nullable: true })
  latitude: number;
}
