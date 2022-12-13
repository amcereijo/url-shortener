import { Controller, Get, HttpCode, Inject, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { RedirectOriginallDto } from './redirect-original.dto';
import { RedirectOriginalService } from './redirect-original.service';

@Controller('/')
export class RedirectOriginalController {
  constructor(
    @Inject('RedirectOriginalService')
    private readonly redirectOriginalService: RedirectOriginalService,
  ) {}

  @Get('/:token')
  @HttpCode(200)
  async handler(@Param('token') token: string, @Res() response: Response) {
    const originalUrl = await this.redirectOriginalService.execute(
      new RedirectOriginallDto(token),
    );

    if (!originalUrl) {
      response.status(404).send();
      return;
    }

    response.redirect(originalUrl);
  }
}
