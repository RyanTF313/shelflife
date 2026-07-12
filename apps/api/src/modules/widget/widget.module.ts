import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { VideosModule } from '../videos/videos.module';
import { AnalyticsModule } from '../analytics/analytics.module';
import { WidgetController } from './widget.controller';
import { WidgetScriptController } from './widget-script.controller';

@Module({
  imports: [ProductsModule, VideosModule, AnalyticsModule],
  controllers: [WidgetController, WidgetScriptController],
})
export class WidgetModule {}
