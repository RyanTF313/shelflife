import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  title!: string;

  @IsUrl()
  videoUrl!: string;

  @IsOptional()
  @IsUrl()
  thumbnailUrl?: string;

  @IsString()
  publicId!: string;

  @IsString()
  productId!: string;
}
