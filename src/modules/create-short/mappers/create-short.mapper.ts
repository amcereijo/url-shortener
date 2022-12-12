import { UrlEntity } from '../db/url.entity';
import Url from '../domain/url';

export class CreateShortMapper {
  fromEntityToDomain(urlEntity: UrlEntity): Url {
    return new Url(urlEntity.originalUrl, urlEntity.shortToken);
  }
}
