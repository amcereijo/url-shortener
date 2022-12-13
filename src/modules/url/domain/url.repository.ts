export interface UrlRepository<T> {
  findByOriginalUrl(originalUrl: string): Promise<T | null>;
  insert(urlData: T): Promise<T>;
  findByShortToken(shortToken: string): Promise<T | null>;
}
