import streamifier from 'streamifier';
import { Express } from 'express';
import {
  BadGatewayException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { type Video } from '@shelflife/shared';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateVideoDto } from './dto/create-video.dto';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as CloudinaryClient,
} from 'cloudinary';
import { CLOUDINARY } from '../../cloudinary/cloudinary.provider';

@Injectable()
export class VideosService {
  private readonly logger = new Logger(VideosService.name);

  constructor(
    private prisma: PrismaService,
    @Inject(CLOUDINARY) private cloudinary: typeof CloudinaryClient,
  ) {}

  findByProduct(productId: string): Promise<Video[]> {
    return this.prisma.video.findMany({ where: { productId } });
  }

  async findOne(id: string): Promise<Video> {
    const video = await this.prisma.video.findUnique({ where: { id } });
    if (!video) {
      throw new NotFoundException(`Video ${id} not found`);
    }
    return video;
  }

  create(video: CreateVideoDto): Promise<Video> {
    return this.prisma.video.create({
      data: { ...video, views: 0, clicks: 0 },
    });
  }

  incrementViews(id: string): Promise<Video> {
    return this.prisma.video.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  }

  incrementClicks(id: string): Promise<Video> {
    return this.prisma.video.update({
      where: { id },
      data: { clicks: { increment: 1 } },
    });
  }

  async remove(id: string): Promise<Video> {
    const video = await this.findOne(id);

    await this.cloudinary.uploader
      .destroy(video.publicId, { resource_type: 'video' })
      .catch((error) =>
        this.logger.error(
          `Failed to remove Cloudinary asset ${video.publicId} while deleting video ${id}`,
          error,
        ),
      );

    return this.prisma.video.delete({ where: { id } });
  }

  async upload(
    file: Express.Multer.File,
    title: string,
    productId: string,
  ): Promise<Video> {
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = this.cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'creatorshelf',
        },
        (
          error: UploadApiErrorResponse | undefined,
          result: UploadApiResponse | undefined,
        ) => {
          if (error || !result) {
            return reject(
              new BadGatewayException(
                error?.message ?? 'Cloudinary upload failed',
              ),
            );
          }
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });

    try {
      return await this.prisma.video.create({
        data: {
          title,
          productId,

          videoUrl: result.secure_url,
          // so_0 grabs the first frame; swap (not append) the extension for a jpg thumbnail.
          thumbnailUrl: result.secure_url
            .replace('/upload/', '/upload/so_0/')
            .replace(/\.[^/.]+$/, '.jpg'),

          publicId: result.public_id,

          duration:
            typeof result.duration === 'number'
              ? Math.round(result.duration)
              : undefined,
          width: result.width,
          height: result.height,

          views: 0,
          clicks: 0,
        },
      });
    } catch (dbError) {
      await this.cloudinary.uploader
        .destroy(result.public_id, { resource_type: 'video' })
        .catch((cleanupError) =>
          this.logger.error(
            `Failed to clean up orphaned Cloudinary asset ${result.public_id} after a failed video save`,
            cleanupError,
          ),
        );
      throw dbError;
    }
  }
}
