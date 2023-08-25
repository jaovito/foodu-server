import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, Restaurant } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/upload-files/upload-files.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { FindAllRestaurantsInput } from './dto/find-restaurants.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileUploadService,
  ) {
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async uploadFile(id: string, file: Express.Multer.File) {
    if (!file?.filename) {
      throw new HttpException('File not attached', 400);
    }

    const { Key: file_key, Location: file_url } =
      await this.fileService.uploadFile(file);

    let restaurant = await this.prisma.restaurant.findFirst({
      where: { id },
      include: {
        file: true,
        categories_on_restaurants: {
          include: {
            category: true,
          },
        },
        foods: true,
      },
    });

    if (!restaurant) {
      throw new HttpException('Restaurant not found', 404);
    }

    restaurant = await this.prisma.restaurant.update({
      where: { id },
      data: {
        file: {
          create: {
            file_key,
            file_url,
          },
        },
      },
      include: {
        file: true,
        categories_on_restaurants: {
          include: {
            category: true,
          },
        },
        foods: true,
      },
    });

    return restaurant;
  }

  async create(createRestaurantInput: CreateRestaurantInput) {
    const restaurant = await this.prisma.restaurant.create({
      data: createRestaurantInput,
      include: {
        file: true,
        categories_on_restaurants: {
          include: {
            category: true,
          },
        },
        foods: true,
      },
    });

    return restaurant;
  }

  async findAll({ latitude, longitude, categories }: FindAllRestaurantsInput) {
    const restaurantsByDistance = await this.prisma.$queryRaw<Restaurant[]>`
    SELECT 
      restaurants.*,
      to_json("files") AS "file"
    FROM (
        SELECT *,
        (
          6371 * acos(cos(radians(${Number(latitude)}))
          * cos(radians(latitude))
          * cos(radians(longitude)
          - radians(${Number(longitude)}))
          + sin(radians(${Number(latitude)}))
          * sin(radians(latitude)))
        ) as distance
        FROM restaurants
    ) as restaurants
    LEFT JOIN files
    ON files.id = restaurants.file_id
    WHERE distance < restaurants.max_distance;`;

    if (categories?.length > 0) {
      const restaurantsWithCategories = restaurantsByDistance.map(
        (restaurant) => restaurant.id,
      );

      const restaurants = await this.prisma.restaurant.findMany({
        where: {
          categories_on_restaurants: {
            some: {
              category: {
                name: { in: categories },
              },
            },
          },
          id: { in: restaurantsWithCategories },
        },
        include: {
          file: true,
          categories_on_restaurants: {
            include: {
              category: true,
            },
          },
          foods: true,
        },
      });

      return restaurants;
    }

    const restaurantsRaw = await Promise.all(
      await restaurantsByDistance?.map(async (restaurant) => {
        const foods = await this.prisma.food.findMany({
          where: { restaurant_id: restaurant.id },
          include: {
            file: true,
            categories_on_foods: {
              include: {
                category: true,
              },
            },
          },
        });

        const categories_on_restaurants =
          await this.prisma.categoriesOnRestaurants.findMany({
            where: { restaurant_id: restaurant.id },
            include: {
              category: true,
            },
          });

        return { ...restaurant, foods, categories_on_restaurants };
      }),
    );

    return restaurantsRaw;
  }

  async findOne(id: string) {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: { id },
      include: {
        file: true,
        categories_on_restaurants: {
          include: {
            category: true,
          },
        },
        foods: true,
      },
    });

    if (!restaurant) {
      throw new HttpException('Restaurant does not exist', 400);
    }

    return restaurant;
  }

  async update(id: string, updateRestaurantInput: UpdateRestaurantInput) {
    let restaurant = await this.prisma.restaurant.findFirst({
      where: { id },
      include: {
        file: true,
        categories_on_restaurants: {
          include: {
            category: true,
          },
        },
        foods: true,
      },
    });

    if (!restaurant) {
      throw new HttpException('Restaurant does not exist', 400);
    }

    restaurant = await this.prisma.restaurant.update({
      where: { id },
      data: updateRestaurantInput,
      include: {
        file: true,
        categories_on_restaurants: {
          include: {
            category: true,
          },
        },
        foods: true,
      },
    });

    return restaurant;
  }

  async remove(id: string) {
    const restaurant = await this.prisma.restaurant.findFirst({
      where: { id },
    });

    if (!restaurant) {
      throw new HttpException('Restaurant does not exist', 400);
    }

    await this.prisma.restaurant.delete({
      where: { id },
    });

    return {
      message: 'DELETED',
      status: 200,
    };
  }
}
