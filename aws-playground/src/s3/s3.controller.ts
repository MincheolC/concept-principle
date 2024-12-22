import { Controller, Post, Body } from '@nestjs/common';
import { CreatePresignedUrlDto } from './dto/create-presigned-url.dto';
import { S3Service } from './s3.service';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('presigned-url')
  async getPresignedUrl(@Body() body: CreatePresignedUrlDto) {
    return await this.s3Service.generatePresignedUrl(
      body.fileName,
      body.contentType,
    );
  }
}
