import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { v4 } from 'uuid';
import { PinoLoggerService } from '../logger/logger.service';

@Injectable()
export class LogRequestInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLoggerService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const id = v4();

    const { params, query, body, headers, user } = request;
    const { url, method } = request;

    if (url !== '/health') {
      const message = {
        id,
        type: 'request',
        method,
        url,
        params,
        query,
        body,
        headers,
        user: (user || {}).id,
      };
      this.logger.log(message);
    }

    return next.handle().pipe(
      tap((data) => {
        const responseMessage = {
          id,
          type: 'response',
          method,
          url,
          params,
          query,
          body,
          headers,
          user: (user || {}).id,
          data,
        };

        if (url !== '/health') {
          this.logger.log(responseMessage);
        }
      }),
      catchError((err) => {
        const { message: error, status, stack } = err;
        const errorMessage = {
          id,
          type: 'error',
          method,
          url,
          params,
          query,
          body,
          headers,
          user: (user || {}).id,
          data: { error, status, stack },
        };
        this.logger.error(errorMessage);

        return throwError(err);
      }),
    );
  }
}
