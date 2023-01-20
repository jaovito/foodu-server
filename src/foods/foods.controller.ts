import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FoodsService } from './foods.service';

@Controller('foods')
export class FoodsController {
  constructor(private foodsService: FoodsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.foodsService.uploadFile(id, file);
  }
}
