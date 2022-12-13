import { Inject, Injectable, Logger } from '@nestjs/common';
import { VisitUrlDto } from '../../../shared/dto/visit-url.dto';
import VisitUrlStatics from '../../domain/visit-url-statics';
import { VisitUrlStaticsRepository } from '../../domain/visit-url-statics.repository';

@Injectable()
export class VisitUrlService {
  private readonly logger = new Logger(VisitUrlService.name);

  constructor(
    @Inject('VisitUrlStaticsRepository')
    private readonly visitUrlStaticsRepository: VisitUrlStaticsRepository<VisitUrlStatics>, // private readonly mapper: UrlMapper,
  ) {}

  async execute(visitUrlData: VisitUrlDto): Promise<void> {
    await this.visitUrlStaticsRepository.incrementVisit(visitUrlData);

    this.logger.debug(
      `Incremented visits for ${visitUrlData.originalUrl} - ${visitUrlData.shortToken}`,
    );
  }
}
