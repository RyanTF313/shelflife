import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { appConfig, cloudinaryConfig, jwtConfig } from './configuration';
import { validateEnv } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig, cloudinaryConfig],
      validate: validateEnv,
    }),
  ],
})
export class ConfigModule {}
