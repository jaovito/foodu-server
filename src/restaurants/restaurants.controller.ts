import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.restaurantsService.uploadFile(id, file);
  }
}
