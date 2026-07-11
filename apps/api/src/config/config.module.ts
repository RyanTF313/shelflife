import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { appConfig, jwtConfig } from './configuration';
import { validateEnv } from './env.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, jwtConfig],
      validate: validateEnv,
    }),
  ],
})
export class ConfigModule {}
