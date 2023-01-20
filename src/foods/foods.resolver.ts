import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FoodsService } from './foods.service';
import { Food } from './entities/food.entity';
import { CreateFoodInput } from './dto/create-food.input';
import { UpdateFoodInput } from './dto/update-food.input';
import { CustomResponse } from 'src/utils/custom-response';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { GqlRolesGuard } from 'src/roles/gql.role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';

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
    @Args('categories', { type: () => [String], nullable: true })
    categories: string[],
  ) {
    return this.foodsService.findAll(categories);
  }

  @Query(() => Food, { name: 'food' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.foodsService.findOne(id);
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
