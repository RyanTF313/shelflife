import { IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsUrl()
  image!: string;
}
