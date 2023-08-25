import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWalletInput } from './dto/create-wallet.input';

@Injectable()
export class WalletsService {
  constructor(private readonly prisma: PrismaService) {}

  async addValue(createWalletInput: CreateWalletInput, email: string) {
    let user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new HttpException('User not found', 400);
    }

    user = await this.prisma.user.update({
      where: { email },
      data: {
        value: user.value + createWalletInput.value,
      },
    });

    return user;
  }
}
