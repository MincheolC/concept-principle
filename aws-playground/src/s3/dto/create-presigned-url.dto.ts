import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePresignedUrlDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;
}
