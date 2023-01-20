import { NestFactory } from '@nestjs/core';
import { registerEnumType } from '@nestjs/graphql';
import { FoodSize } from '@prisma/client';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  registerEnumType(FoodSize, {
    name: 'FoodSize',
  });

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
