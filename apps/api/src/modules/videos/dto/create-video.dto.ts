import { IsString, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  title!: string;

  @IsUrl()
  url!: string;

  @IsUrl()
  thumbnail!: string;

  @IsString()
  productId!: string;
}
