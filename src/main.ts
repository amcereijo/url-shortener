import { NestFactory } from '@nestjs/core';
import { configure } from './app.configure';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configure(app);

  await app.listen(process.env.PORT);
}
bootstrap();
