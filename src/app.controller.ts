import { Controller, Get, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Default')
export class AppController {
  @Get('/health')
  @SetMetadata('access', false)
  healthCheck(): string {
    return `it's up!`;
  }
}
