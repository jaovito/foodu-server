import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    let user = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      Number(process.env.HASH_PASSWORD),
    );

    user = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        doccument: createUserDto.doccument,
        cel: createUserDto.cel,
        password: hashedPassword,
      },
    });

    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
