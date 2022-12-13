import { Controller, Inject, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import constants from '../../../shared/constants';
import { VisitUrlDto } from '../../../shared/dto/visit-url.dto';
import { VisitUrlService } from './visit-url-event.service';

@Controller()
export class VisitUrleventHandler {
  private logger = new Logger(VisitUrleventHandler.name);

  constructor(
    @Inject('VisitUrlService')
    private readonly visitUrlService: VisitUrlService,
  ) {}

  @EventPattern(constants.VISIT_URL_EVENT)
  async handler(visitUrlData: VisitUrlDto): Promise<void> {
    this.logger.debug(
      `Message to ${constants.VISIT_URL_EVENT} with ${JSON.stringify(
        visitUrlData,
      )}`,
    );

    await this.visitUrlService.execute(visitUrlData);
  }
}
