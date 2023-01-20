import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/s3/s3.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileUploadService,
  ) {}

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

  async findAll(categories?: string[]) {
    if (categories?.length > 0) {
      const restaurants = await this.prisma.restaurant.findMany({
        where: {
          categories_on_restaurants: {
            some: {
              category: {
                name: { in: categories },
              },
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

      return restaurants;
    }

    const restaurants = await this.prisma.restaurant.findMany();

    return restaurants;
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
