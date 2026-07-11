import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UploadVideoDto } from './dto/upload-video.dto';
import { Timeout } from '../../common/decorators/timeout.decorator';
import { memoryStorage } from 'multer';

const VIDEO_UPLOAD_TIMEOUT_MS = 120_000;

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

  @Post('upload')
  @Timeout(VIDEO_UPLOAD_TIMEOUT_MS)
  @UseInterceptors(
    FileInterceptor('video', {
      storage: memoryStorage(),
    }),
  )
  upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadVideoDto,
  ) {
    if (!file) {
      throw new BadRequestException('A video file is required');
    }
    return this.videosService.upload(file, body.title, body.productId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(id);
  }
}
