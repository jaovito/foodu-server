import { Module } from '@nestjs/common';
import { FoodsService } from './foods.service';
import { FoodsResolver } from './foods.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/upload-files/upload-files.service';
import { FoodsController } from './foods.controller';

@Module({
  controllers: [FoodsController],
  providers: [FoodsResolver, FoodsService, PrismaService, FileUploadService],
})
export class FoodsModule {}
