import { NestExpressApplication } from '@nestjs/platform-express';

const setupCors = (app: NestExpressApplication) => {
  app.enableCors();
};

export default setupCors;
