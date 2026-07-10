import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { VideosModule } from './videos/videos.module';
@Module({
  imports: [ProductsModule, VideosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
