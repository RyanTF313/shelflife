import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Get,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Post('videos/:videoId/views')
  @HttpCode(HttpStatus.OK)
  recordView(@Param('videoId') videoId: string) {
    return this.analyticsService.recordView(videoId);
  }

  @Post('videos/:videoId/clicks')
  @HttpCode(HttpStatus.OK)
  recordClick(@Param('videoId') videoId: string) {
    return this.analyticsService.recordClick(videoId);
  }

  @Get('products/:productId')
  getProductSummary(@Param('productId') productId: string) {
    return this.analyticsService.getProductSummary(productId);
  }
}
