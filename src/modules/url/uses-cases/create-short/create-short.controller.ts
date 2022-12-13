import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { UrlMapper } from '../mappers/url.mapper';
import { CreateShortUrlRequestDto } from './create-short.request.dto';
import { CreateShortService } from './create-short.service';

@Controller('create')
export class CreateShortController {
  constructor(
    @Inject('CreateShortService')
    private readonly createShortService: CreateShortService,
    private readonly mapper: UrlMapper,
  ) {}

  @Post()
  @HttpCode(200)
  async handler(
    @Body()
    createShortUrlRequest: CreateShortUrlRequestDto,
  ) {
    let createShortDto = this.mapper.fromRequestDtoToDto(createShortUrlRequest);

    createShortDto = await this.createShortService.execute(createShortDto);

    return this.mapper.fromDtoToResponse(createShortDto);
  }
}
