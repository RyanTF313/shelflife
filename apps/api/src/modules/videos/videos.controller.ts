import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get(':productId')
  getVideos(@Param('productId') productId: string) {
    return this.videosService.findByProduct(productId);
  }

  @Post()
  create(@Body() body: CreateVideoDto) {
    return this.videosService.create(body);
  }
}
