import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import constants from '../../../shared/constants';
import { VisitUrlDto } from '../../../shared/dto/visit-url.dto';
import Url from '../../domain/url';
import { UrlRepository } from '../../domain/url.repository';
import { UrlMapper } from '../../mappers/url.mapper';
import { RedirectOriginallDto } from './redirect-original.dto';

@Injectable()
export class RedirectOriginalService {
  readonly logger = new Logger(RedirectOriginalService.name);

  constructor(
    @Inject('UrlRepository')
    private readonly urlRepository: UrlRepository<Url>,
    private readonly mapper: UrlMapper,
    @Inject('VISIT_URL_MQ_SERVICE')
    private visitUrlMqClient: ClientProxy,
  ) {}

  async execute(redirectData: RedirectOriginallDto): Promise<string | null> {
    const urlData = await this.urlRepository.findByShortToken(
      redirectData.shortToken,
    );

    this.logger.debug(
      `Found for shortToken ${redirectData.shortToken}: ${JSON.stringify(
        urlData,
      )}`,
    );

    if (urlData) {
      this.visitUrlMqClient.emit(
        constants.VISIT_URL_EVENT,
        new VisitUrlDto(urlData.originalUrl, urlData.getShortToken()),
      );

      return urlData.originalUrl;
    }

    return null;
  }
}
