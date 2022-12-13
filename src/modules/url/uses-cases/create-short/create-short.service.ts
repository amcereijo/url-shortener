import { Inject, Injectable, Logger } from '@nestjs/common';
import Url from '../../domain/url';
import { UrlRepository } from '../../domain/url.repository';
import { UrlMapper } from '../../mappers/url.mapper';
import { CreateShortUrlDto } from './create-short.dto';

@Injectable()
export class CreateShortService {
  readonly logger = new Logger(CreateShortService.name);

  constructor(
    @Inject('UrlRepository')
    private readonly urlRepository: UrlRepository<Url>,
    private readonly mapper: UrlMapper,
  ) {}

  async execute(createShort: CreateShortUrlDto): Promise<CreateShortUrlDto> {
    let urlData = await this.urlRepository.findByOriginalUrl(
      createShort.originalUrl,
    );

    if (urlData) {
      this.logger.debug(
        `using existing data for ${createShort.originalUrl} - ${createShort.shortToken}`,
      );

      return this.mapper.fromDomainToDto(urlData);
    }

    urlData = new Url(createShort.originalUrl);
    urlData.generateShortToken();

    this.logger.debug(
      `insert new data for ${
        createShort.originalUrl
      } - ${urlData.getShortToken()}`,
    );

    await this.urlRepository.insert(urlData);

    return this.mapper.fromDomainToDto(urlData);
  }
}
