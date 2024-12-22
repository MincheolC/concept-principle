import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const VIDEO_MIME_TYPES = [
  'video/mp4', // .mp4
  'video/quicktime', // .mov
] as const;

const IMAGE_MIME_TYPES = ['image/jpeg'] as const;

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  private isVideoMimeType(contentType: string): boolean {
    return (VIDEO_MIME_TYPES as readonly string[]).includes(contentType);
  }

  private isImageMimeType(contentType: string): boolean {
    return (IMAGE_MIME_TYPES as readonly string[]).includes(contentType);
  }

  private getKey(fileName: string, contentType: string): string {
    const key = `${Date.now()}-${fileName}`;
    if (this.isVideoMimeType(contentType)) {
      return `videos/${key}`;
    } else if (this.isImageMimeType(contentType)) {
      return `images/${key}`;
    }
    throw new Error('Invalid file type');
  }

  async generatePresignedUrl(
    fileName: string,
    contentType: string,
  ): Promise<{ presignedUrl: string; fileKey: string; publicUrl: string }> {
    const key = this.getKey(fileName, contentType);
    const command = new PutObjectCommand({
      Bucket: this.configService.get('AWS_S3_BUCKET'),
      Key: key,
      ContentType: contentType,
    });

    try {
      const presignedUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 60 * 5, // seconds (5 minutes)
      });
      return {
        presignedUrl,
        fileKey: key,
        publicUrl: `https://${this.configService.get('AWS_S3_BUCKET')}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${key}`,
      };
    } catch (error) {
      throw new Error(`Failed to generate presigned URL: ${error.message}`);
    }
  }
}
