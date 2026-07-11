import { Injectable } from '@nestjs/common';
import { Video } from '@shelflife/shared';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VideosService {
  constructor(private prisma: PrismaService) {}

  findByProduct(productId: string): Promise<Video[]> {
    return this.prisma.video.findMany({ where: { productId } });
  }

  create(video: Omit<Video, 'id' | 'views' | 'clicks'>): Promise<Video> {
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
}
