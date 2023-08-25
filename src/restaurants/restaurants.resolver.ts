import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { CustomResponse } from 'src/utils/custom-response';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { GqlRolesGuard } from 'src/roles/gql.role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { FindAllRestaurantsInput } from './dto/find-restaurants.input';

@UseGuards(GqlAuthGuard, GqlRolesGuard)
@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Roles(Role.ADMIN, Role.CHEF)
  @Mutation(() => Restaurant, {
    description: 'Creates a restaurant using RestaurantInput',
  })
  createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ) {
    return this.restaurantsService.create(createRestaurantInput);
  }

  @Query(() => [Restaurant], {
    name: 'restaurants',
    description: 'Find all restaurants by proximity (latitude and longitude)',
  })
  findAll(
    @Args('findAllRestaurantsInput')
    FindAllRestaurantsInput: FindAllRestaurantsInput,
  ) {
    return this.restaurantsService.findAll(FindAllRestaurantsInput);
  }

  @Query(() => Restaurant, {
    name: 'restaurant',
    description: 'Find one restaurant by ID',
  })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Roles(Role.ADMIN, Role.CHEF)
  @Mutation(() => Restaurant, {
    description:
      'Updates a restaurant, only admin or chef is allowed to update it',
  })
  updateRestaurant(
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
  ) {
    return this.restaurantsService.update(
      updateRestaurantInput.id,
      updateRestaurantInput,
    );
  }

  @Roles(Role.ADMIN, Role.CHEF)
  @Mutation(() => CustomResponse, {
    description:
      'Delete a restaurant, only admin or chef is allowed to delete it',
  })
  removeRestaurant(@Args('id', { type: () => String }) id: string) {
    return this.restaurantsService.remove(id);
  }
}
