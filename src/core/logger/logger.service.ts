import { Injectable, LoggerService } from '@nestjs/common';
import { pino as Pino } from 'pino';

@Injectable()
export class PinoLoggerService implements LoggerService {
  private pino;

  constructor() {
    this.pino = Pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
        }
      }
    });
  }

  log(message: any, context?: string): void {
    this.pino.info(message, context);
  }
  error(message: any, trace?: string, context?: string): void {
    this.pino.error(message, trace, context);
  }
  warn(message: any, context?: string): void {
    this.pino.warn(message, context);
  }
}
