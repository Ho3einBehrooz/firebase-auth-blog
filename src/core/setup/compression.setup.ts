import { NestExpressApplication } from '@nestjs/platform-express';
import * as Compression from 'compression';

const setupCompression = (app: NestExpressApplication) => {
  app.use(Compression());
};

export default setupCompression;
