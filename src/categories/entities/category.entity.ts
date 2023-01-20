import { ObjectType, Field } from '@nestjs/graphql';

import {
  Category as DBCategory,
  CategoriesOnRestaurants as DBCategoriesOnRestaurants,
  CategoriesOnFoods as DBCategoriesOnFoods,
} from '@prisma/client';
import { Food } from 'src/foods/entities/food.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { File } from 'src/users/entities/file.entity';

@ObjectType()
class CategoriesOnRestaurants implements DBCategoriesOnRestaurants {
  @Field()
  category_id: string;

  @Field()
  restaurant_id: string;

  @Field(() => Restaurant)
  restaurant: Restaurant;
}

@ObjectType()
class CategoriesOnFoods implements DBCategoriesOnFoods {
  @Field()
  category_id: string;

  @Field()
  food_id: string;

  @Field(() => Food)
  food: Food;
}

@ObjectType()
export class Category implements DBCategory {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field({ nullable: true })
  food_id: string;

  @Field({ nullable: true })
  file_id: string;

  @Field(() => File, { nullable: true })
  file: File;

  @Field(() => [CategoriesOnRestaurants], { nullable: true })
  restaurants: CategoriesOnRestaurants[];

  @Field({ nullable: true })
  restaurant_id: string;

  @Field(() => [CategoriesOnFoods], { nullable: true })
  foods: CategoriesOnFoods[];
}
