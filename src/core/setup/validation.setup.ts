import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

const setupValidation = ({
  app,
  disableErrorMessages,
}: {
  app: NestExpressApplication;
  disableErrorMessages: boolean;
}) => {
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
};

export default setupValidation;
