import { Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { VideosService } from '../videos/videos.service';
import { AnalyticsService } from '../analytics/analytics.service';

@Controller('widget')
export class WidgetController {
  constructor(
    private productsService: ProductsService,
    private videosService: VideosService,
    private analyticsService: AnalyticsService,
  ) {}

  @Get('products/:id')
  async getProduct(@Param('id') id: string) {
    const [product, videos] = await Promise.all([
      this.productsService.findOne(id),
      this.videosService.findByProduct(id),
    ]);
    return { product, videos };
  }

  @Post('videos/:id/views')
  @HttpCode(HttpStatus.NO_CONTENT)
  recordView(@Param('id') id: string) {
    return this.analyticsService.recordView(id);
  }

  @Post('videos/:id/clicks')
  @HttpCode(HttpStatus.NO_CONTENT)
  recordClick(@Param('id') id: string) {
    return this.analyticsService.recordClick(id);
  }
}
