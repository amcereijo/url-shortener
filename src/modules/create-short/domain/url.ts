export default class Url {
  private shortToken: string;

  constructor(readonly originalUrl: string, shortToken?: string) {
    this.shortToken = shortToken;
  }

  generateShortToken(): string {
    // generate short
    return this.shortToken;
  }

  getShortToken() {
    return this.shortToken;
  }
}
