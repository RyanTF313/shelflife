import { IsString } from 'class-validator';

export class UploadVideoDto {
  @IsString()
  title!: string;

  @IsString()
  productId!: string;
}
