import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { VideosModule } from './modules/videos/videos.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AuthModule } from './modules/auth/auth.module';
import { WidgetModule } from './modules/widget/widget.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    ProductsModule,
    VideosModule,
    AnalyticsModule,
    AuthModule,
    WidgetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
