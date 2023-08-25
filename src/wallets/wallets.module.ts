import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsResolver } from './wallets.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [WalletsResolver, WalletsService, PrismaService],
})
export class WalletsModule {}
