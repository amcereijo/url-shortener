import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import MessageBroker from './message-broker/message-broker';

export async function configure(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(new Logger('Url-shortener'));

  const messageBroker: MessageBroker = app.get('MESSAGE_BROKER');
  await messageBroker.init(app);
}
