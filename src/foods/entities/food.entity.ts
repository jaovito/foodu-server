import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Food as DBFood,
  FoodSize,
  CategoriesOnFoods as DBCategoriesOnFoods,
  FoodOnUsers as DBFoodOnUsers,
} from '@prisma/client';
import { Category } from 'src/categories/entities/category.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { File } from 'src/users/entities/file.entity';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
class CategoriesOnFoodsFD implements DBCategoriesOnFoods {
  @Field()
  category_id: string;

  @Field()
  food_id: string;

  @Field(() => Category)
  category: Category;
}

@ObjectType()
class FoodsOnUsers implements DBFoodOnUsers {
  @Field(() => Int)
  quantity: number;

  @Field()
  food_id: string;

  @Field()
  delivery_time: Date;

  @Field()
  user_id: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class Food implements DBFood {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  about: string;

  @Field(() => FoodSize, { defaultValue: FoodSize.MEDIUM })
  size: FoodSize;

  @Field()
  energy: string;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field({ nullable: true })
  restaurant_id: string;

  @Field({ nullable: true })
  file_id: string;

  @Field(() => File, { nullable: true })
  file: File;

  @Field(() => Restaurant, { nullable: true })
  restaurant: Restaurant;

  @Field(() => [CategoriesOnFoodsFD], { nullable: true })
  categories_on_foods: CategoriesOnFoodsFD[];

  @Field(() => [FoodsOnUsers], { nullable: true })
  foods_on_users: FoodsOnUsers[];
}
