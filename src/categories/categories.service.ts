import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput) {
    const category = await this.prisma.category.create({
      data: createCategoryInput,
      include: {
        categories_on_restaurants: {
          include: {
            restaurant: true,
          },
        },
        file: true,
        categories_on_foods: {
          include: {
            food: true,
          },
        },
      },
    });

    return category;
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        categories_on_restaurants: {
          include: {
            restaurant: true,
          },
        },
        file: true,
        categories_on_foods: {
          include: {
            food: true,
          },
        },
      },
    });

    return categories;
  }

  async findOne(id: string) {
    const category = await this.prisma.category.findFirst({
      where: { id },
      include: {
        categories_on_restaurants: {
          include: {
            restaurant: true,
          },
        },
        file: true,
        categories_on_foods: {
          include: {
            food: true,
          },
        },
      },
    });

    if (!category) {
      throw new HttpException('Category not found', 400);
    }

    return category;
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    let category = await this.prisma.category.findFirst({
      where: { id },
      include: {
        categories_on_restaurants: {
          include: {
            restaurant: true,
          },
        },
        file: true,
        categories_on_foods: {
          include: {
            food: true,
          },
        },
      },
    });

    if (!category) {
      throw new HttpException('Category not found', 400);
    }

    category = await this.prisma.category.update({
      where: { id },
      data: updateCategoryInput,
      include: {
        categories_on_restaurants: {
          include: {
            restaurant: true,
          },
        },
        file: true,
        categories_on_foods: {
          include: {
            food: true,
          },
        },
      },
    });

    return category;
  }

  async remove(id: string) {
    const category = await this.prisma.category.findFirst({
      where: { id },
      include: {
        categories_on_restaurants: {
          include: {
            restaurant: true,
          },
        },
        file: true,
        categories_on_foods: {
          include: {
            food: true,
          },
        },
      },
    });

    if (!category) {
      throw new HttpException('Category not found', 400);
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return category;
  }
}
