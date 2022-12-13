import { INestApplication } from '@nestjs/common';

export default interface MessageBroker {
  init(app: INestApplication): Promise<void>;
}
