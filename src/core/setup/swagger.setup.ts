import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { UnauthorizedResponse } from '../swagger/responses/unauthorize.response';

const setupSwagger = (app: NestExpressApplication, basePath: string) => {
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Blog API description')
    .setVersion('0.1.6')
    .addBearerAuth({
      type: 'http',
      in: 'api',
      name: 'Authorization',
      scheme: 'bearer',
      bearerFormat: 'jwt',
    })
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Blog API Docs',
  };
  const documentOptions: SwaggerDocumentOptions = {
    extraModels: [UnauthorizedResponse],
  };

  const document = SwaggerModule.createDocument(app, config, documentOptions);
  SwaggerModule.setup('/docs', app, document, customOptions);
};

export default setupSwagger;
