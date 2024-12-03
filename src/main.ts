import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configService } from '@core/config/config.service';
import { setupCors, setupBodyParser, setupCompression, setupValidation } from '@core/setup';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  setupCors(app);
  setupBodyParser(app);
  setupCompression(app);
  setupValidation({
    app,
    disableErrorMessages: false,
  });

  // app starts at the specific port
  const { host, port } = configService.getHostAndPort();
  await app.listen(Number(port), host, () => {
    console.log(`Server listening on ${host}:${port}`);
  });
}
bootstrap();
