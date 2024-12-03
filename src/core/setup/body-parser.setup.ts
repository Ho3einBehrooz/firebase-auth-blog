import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';

const setupBodyParser = (app: NestExpressApplication) => {
  app.use(json({ limit: '10mb' }));
};

export default setupBodyParser;
