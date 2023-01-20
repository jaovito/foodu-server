import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/s3/s3.service';
import { CreateFoodInput } from './dto/create-food.input';
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

  async findAll(categories?: string[]) {
    if (categories?.length > 0) {
      const foods = await this.prisma.food.findMany({
        where: {
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
        },
      });

      return foods;
    }

    const foods = await this.prisma.food.findMany({
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

    return foods;
  }

  async findOne(id: string) {
    const food = await this.prisma.food.findFirst({
      where: { id },
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
