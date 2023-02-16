import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploadService } from 'src/upload-files/upload-files.service';
import { RestaurantsController } from './restaurants.controller';

@Module({
  controllers: [RestaurantsController],
  providers: [
    RestaurantsResolver,
    RestaurantsService,
    PrismaService,
    FileUploadService,
  ],
})
export class RestaurantsModule {}
