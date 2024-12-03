import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configService } from '@core/config/config.service';
import {
  setupCors,
  setupBodyParser,
  setupCompression,
  setupValidation,
  setupInterceptor,
  setupSwagger,
} from '@core/setup';
import { PinoLoggerService } from '@core/logger/logger.service';
import { NodeEnvironment } from 'src/common/abstractions/node-environment.enum';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  setupCors(app);
  setupBodyParser(app);
  setupCompression(app);
  setupValidation({
    app,
    disableErrorMessages: false,
  });
  setupSwagger(app, 'docs');

  const logger = app.get(PinoLoggerService);
  const environment = configService.getEnvironment();
  if (environment != NodeEnvironment.LOCAL) {
    setupInterceptor({ app, logger });
  }

  // app starts at the specific port
  const { host, port } = configService.getHostAndPort();
  await app.listen(Number(port), host, () => {
    console.log(`Server listening on ${host}:${port}`);
  });
}
bootstrap();
