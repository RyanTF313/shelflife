import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // The embeddable widget runs on arbitrary third-party origins, so its
  // routes get an open CORS policy independent of the dashboard's CORS_ORIGIN.
  app.enableCors((req, callback) => {
    const isWidgetRoute = req.path.startsWith('/widget');
    callback(null, {
      origin: isWidgetRoute ? true : configService.get<string>('app.corsOrigin'),
    });
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TimeoutInterceptor(app.get(Reflector)),
  );

  await app.listen(configService.get<number>('app.port') ?? 3000);
}
bootstrap();
