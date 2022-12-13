import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';

export function configure(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(new Logger('Url-shortener'));
}
