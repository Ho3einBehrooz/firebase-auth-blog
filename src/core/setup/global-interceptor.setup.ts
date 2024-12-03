import { NestExpressApplication } from '@nestjs/platform-express';
import { PinoLoggerService } from '@core/logger/logger.service';
import { LogRequestInterceptor } from '@core/transform/log-request.interceptor';

const setupInterceptor = ({
  app,
  logger,
}: {
  app: NestExpressApplication;
  logger: PinoLoggerService;
}) => {
  app.useGlobalInterceptors(new LogRequestInterceptor(logger));
};

export default setupInterceptor;
