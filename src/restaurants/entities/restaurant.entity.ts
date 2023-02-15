import { ObjectType, Field, Float } from '@nestjs/graphql';
import {
  Restaurant as DBRestaurant,
  CategoriesOnRestaurants as DBCategoriesOnRestaurants,
} from '@prisma/client';
import { Category } from 'src/categories/entities/category.entity';
import { Food } from 'src/foods/entities/food.entity';
import { File } from 'src/users/entities/file.entity';

@ObjectType()
class CategoriesOnRestaurantsRS implements DBCategoriesOnRestaurants {
  @Field()
  category_id: string;

  @Field()
  restaurant_id: string;

  @Field(() => Category)
  category: Category;
}

@ObjectType()
export class Restaurant implements DBRestaurant {
  @Field()
  id: string;

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

  @Field({ nullable: true })
  file_id: string;

  @Field(() => File, { nullable: true })
  file: File;

  @Field(() => Float, { nullable: true })
  longitude: number;

  @Field(() => Float, { nullable: true })
  latitude: number;

  @Field(() => [CategoriesOnRestaurantsRS], { nullable: true })
  categories_on_restaurants: CategoriesOnRestaurantsRS[];

  @Field(() => Float, { defaultValue: 10 })
  max_distance: number;

  @Field(() => [Food])
  foods: Food[];

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
