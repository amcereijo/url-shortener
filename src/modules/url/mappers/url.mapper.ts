import { Inject, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../../../config';
import { UrlEntity } from '../db/url.entity';
import Url from '../domain/url';
import { CreateShortUrlDto } from '../uses-cases/create-short/create-short.dto';
import { CreateShortUrlRequestDto } from '../uses-cases/create-short/create-short.request.dto';

export class UrlMapper {
  private logger = new Logger(UrlMapper.name);

  constructor(
    @Inject('config')
    readonly configService: ConfigType<typeof config>,
  ) {}

  fromEntityToDomain(urlEntity: UrlEntity): Url {
    return new Url(urlEntity.originalUrl, urlEntity.shortToken);
  }

  fromDomainToDto(urlData: Url): CreateShortUrlDto {
    return new CreateShortUrlDto(urlData.originalUrl, urlData.getShortToken());
  }

  fromRequestDtoToDto(
    createShortUrlRequest: CreateShortUrlRequestDto,
  ): CreateShortUrlDto {
    return new CreateShortUrlDto(createShortUrlRequest.url);
  }

  fromDtoToResponse(createShortUrlDto: CreateShortUrlDto) {
    this.logger.debug(
      `createShortUrlDto.shortToken: ${JSON.stringify(createShortUrlDto)}`,
    );
    return {
      shortUrl: `${this.configService.urlBase}/${createShortUrlDto.shortToken}`,
    };
  }
}
