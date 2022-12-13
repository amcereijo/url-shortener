import { IsUrl } from 'class-validator';

export class CreateShortUrlRequestDto {
  @IsUrl()
  url: string;
}
