import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { VideosService } from '../videos/videos.service';

@Injectable()
export class AnalyticsService {
  constructor(
    private prisma: PrismaService,
    private videosService: VideosService,
  ) {}

  recordView(videoId: string) {
    return this.videosService.incrementViews(videoId);
  }

  recordClick(videoId: string) {
    return this.videosService.incrementClicks(videoId);
  }

  async getProductSummary(productId: string) {
    const videos = await this.prisma.video.findMany({
      where: { productId },
    });

    return {
      productId,
      videoCount: videos.length,
      totalViews: videos.reduce((sum, video) => sum + video.views, 0),
      totalClicks: videos.reduce((sum, video) => sum + video.clicks, 0),
    };
  }
}
