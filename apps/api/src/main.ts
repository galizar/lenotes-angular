import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(
		ApiModule, 
		{cors: {origin: ['http://localhost:4200']}}
		);

  await app.listen(3000);
}
bootstrap();
