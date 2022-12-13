import { Logger } from '@nestjs/common';
import { createHash } from 'crypto';

function generateToken(data) {
  return createHash('shake256', {
    outputLength: 4,
  })
    .update(data)
    .digest('hex');
}

export default class Url {
  private shortToken: string;
  private logger = new Logger(Url.name);

  constructor(readonly originalUrl: string, shortToken?: string) {
    this.shortToken = shortToken;
  }

  generateShortToken(): string {
    this.shortToken = generateToken(this.originalUrl);

    this.logger.debug(
      `Generated token  ${this.shortToken} for ${this.originalUrl}`,
    );

    return this.shortToken;
  }

  getShortToken() {
    return this.shortToken;
  }
}
