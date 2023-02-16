import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/upload-files/upload-files.service';
import { BuyFoodInput } from './dto/buy-food.input';
import { CreateFoodInput } from './dto/create-food.input';
import { FindFoodInput } from './dto/find-foods.input';
import { UpdateFoodInput } from './dto/update-food.input';

@Injectable()
export class FoodsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileUploadService,
  ) {}

  async uploadFile(id: string, file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File not attached', 400);
    }

    const { Key: file_key, Location: file_url } =
      await this.fileService.uploadFile(file);

    let food = await this.prisma.food.findFirst({
      where: { id },
      include: {
        categories_on_foods: {
          include: {
            category: true,
          },
        },
        file: true,
        foods_on_users: {
          include: {
            user: true,
          },
        },
        restaurant: true,
      },
    });

    if (!food) {
      throw new HttpException('Food does not exist', 400);
    }

    food = await this.prisma.food.update({
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
        categories_on_foods: {
          include: {
            category: true,
          },
        },
        file: true,
        foods_on_users: {
          include: {
            user: true,
          },
        },
        restaurant: true,
      },
    });

    return food;
  }

  async create(createFoodInput: CreateFoodInput) {
    const categories = await this.prisma.category.findMany({
      where: { id: { in: createFoodInput.categories } },
    });

    if (categories?.length > 0) {
      for (const category of categories) {
        const food = await this.prisma.food.create({
          data: {
            name: createFoodInput.name,
            about: createFoodInput.about,
            energy: createFoodInput.energy,
            restaurant_id: createFoodInput.restaurant_id,
            categories_on_foods: {
              create: {
                category_id: category.id,
              },
            },
          },
          include: {
            categories_on_foods: {
              include: {
                category: true,
              },
            },
            restaurant: true,
            foods_on_users: {
              include: {
                user: true,
              },
            },
          },
        });

        return food;
      }
    }

    const food = await this.prisma.food.create({
      data: {
        name: createFoodInput.name,
        about: createFoodInput.about,
        energy: createFoodInput.energy,
        restaurant_id: createFoodInput.restaurant_id,
      },
      include: {
        file: true,
        categories_on_foods: {
          include: {
            category: true,
          },
        },
        restaurant: true,
        foods_on_users: {
          include: {
            user: true,
          },
        },
      },
    });

    return food;
  }

  async findAll({ restaurant_id, categories }: FindFoodInput) {
    if (categories?.length > 0) {
      const foods = await this.prisma.food.findMany({
        where: {
          restaurant_id,
          categories_on_foods: {
            some: {
              category: {
                name: { in: categories },
              },
            },
          },
        },
        include: {
          categories_on_foods: {
            include: {
              category: true,
            },
          },
          restaurant: true,
          foods_on_users: {
            include: {
              user: true,
            },
          },
          file: true,
        },
      });

      return foods;
    }

    const foods = await this.prisma.food.findMany({
      where: {
        restaurant_id,
      },
      include: {
        file: true,
        categories_on_foods: {
          include: {
            category: true,
          },
        },
        restaurant: true,
        foods_on_users: {
          include: {
            user: true,
          },
        },
      },
    });

    return foods;
  }

  async findOne(id: string) {
    const food = await this.prisma.food.findFirst({
      where: { id },
      include: {
        file: true,
        categories_on_foods: {
          include: {
            category: true,
          },
        },
        restaurant: true,
        foods_on_users: {
          include: {
            user: true,
          },
        },
      },
    });

    return food;
  }

  async buyFood({ food_id, user_id }: BuyFoodInput) {
    let user = await this.prisma.user.findFirst({
      where: { id: user_id },
    });

    if (!user) {
      throw new HttpException('User does not exists', 400);
    }

    const food = await this.prisma.food.findFirst({
      where: { id: food_id },
    });

    if (!food) {
      throw new HttpException('Food does not exists', 400);
    }

    const suficientValue = user.value >= food.price;

    if (!suficientValue) {
      throw new HttpException('You does not have suficient value', 400);
    }

    user = await this.prisma.user.update({
      where: { id: user_id },
      data: {
        value: user.value - food.price <= 0 ? 0 : user.value - food.price,
      },
    });

    const addedFood = await this.prisma.foodOnUsers.create({
      data: {
        food_id,
        user_id,
        delivery_time: '15 min',
        quantity: 1,
      },
      include: {
        food: {
          include: {
            file: true,
            restaurant: true,
            categories_on_foods: {
              include: {
                category: true,
              },
            },
          },
        },
        user: true,
      },
    });

    return addedFood;
  }

  async findAllUserFood(user_id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: user_id },
    });

    if (!user) {
      throw new HttpException('User does not exists', 400);
    }

    const foods = await this.prisma.food.findMany({
      where: { foods_on_users: { some: { user_id } } },
      include: {
        file: true,
        categories_on_foods: {
          include: {
            category: true,
          },
        },
        restaurant: true,
        foods_on_users: {
          include: {
            user: true,
          },
        },
      },
    });

    return foods;
  }

  async update(id: string, updateFoodInput: UpdateFoodInput) {
    let food = await this.prisma.food.findFirst({
      where: { id },
    });

    if (!food) {
      throw new HttpException('Food not found', 400);
    }

    food = await this.prisma.food.update({
      where: { id },
      data: updateFoodInput,
    });

    return food;
  }

  async remove(id: string) {
    const food = await this.prisma.food.findFirst({
      where: { id },
    });

    if (!food) {
      throw new HttpException('Food not found', 400);
    }

    await this.prisma.food.delete({
      where: { id },
    });

    return {
      message: 'DELETED',
      status: 200,
    };
  }
}
