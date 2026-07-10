import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { VideosService } from './videos.service';
import { type Video } from '@shelflife/shared';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get(':productId')
  getVideos(@Param('productId') productId: string) {
    return this.videosService.findByProduct(productId);
  }

  @Post()
  create(@Body() body: Omit<Video, 'id' | 'views' | 'clicks'>) {
    return this.videosService.create(body);
  }
}
