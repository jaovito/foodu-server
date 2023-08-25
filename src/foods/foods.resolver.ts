import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FoodsService } from './foods.service';
import { BuyedFood, Food } from './entities/food.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';
import { CustomResponse } from 'src/utils/custom-response';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { GqlRolesGuard } from 'src/roles/gql.role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { FindFoodInput } from './dto/find-foods.input';
import { BuyFoodInput } from './dto/buy-food.input';
import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/gql';

@UseGuards(GqlAuthGuard, GqlRolesGuard)
@Resolver(() => Food)
export class FoodsResolver {
  constructor(private readonly foodsService: FoodsService) {}

  @Roles(Role.ADMIN, Role.CHEF)
  @Mutation(() => Food)
  createFood(@Args('createFoodInput') createFoodInput: CreateFoodInput) {
    return this.foodsService.create(createFoodInput);
  }

  @Query(() => [Food], { name: 'foods' })
  findAll(
    @Args('findFoodInput')
    findFoodInput: FindFoodInput,
  ) {
    return this.foodsService.findAll(findFoodInput);
  }

  @Query(() => Food, { name: 'food' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.foodsService.findOne(id);
  }

  @Query(() => [Food], { name: 'findAllUserFood' })
  findAllUserFood(@CurrentUser() user: User) {
    return this.foodsService.findAllUserFood(user.id);
  }

  @Mutation(() => BuyedFood, { name: 'buyFood' })
  buyFood(@Args('buyFoodInput') buyFoodInput: BuyFoodInput) {
    return this.foodsService.buyFood(buyFoodInput);
  }

  @Roles(Role.ADMIN, Role.CHEF)
  @Mutation(() => Food)
  updateFood(@Args('updateFoodInput') updateFoodInput: UpdateFoodInput) {
    return this.foodsService.update(updateFoodInput.id, updateFoodInput);
  }

  @Roles(Role.ADMIN, Role.CHEF)
  @Mutation(() => CustomResponse)
  removeFood(@Args('id', { type: () => String }) id: string) {
    return this.foodsService.remove(id);
  }
}
