export class CreateShortUrlDto {
  readonly shortToken: string;
  constructor(readonly originalUrl: string, shortToken?: string) {
    this.shortToken = shortToken;
  }
}
