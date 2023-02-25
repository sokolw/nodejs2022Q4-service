import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { CustomLoggerService } from '../services/custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private customLoggerService: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const { method, originalUrl, body } = req;
      const { statusCode, statusMessage } = res;
      const timePassed = Date.now() - start;
      const message = `[HTTP] METHOD:${method} URL:${originalUrl} CODE:${statusCode} MESSAGE:${statusMessage} BODY:${JSON.stringify(
        body,
      )} ${timePassed}ms`;

      if (statusCode >= 500) {
        return this.customLoggerService.error(message);
      }

      if (statusCode >= 400) {
        return this.customLoggerService.warn(message);
      }

      return this.customLoggerService.log(message);
    });

    next();
  }
}

// const startDate = Date.now();
// response.on('finish', () => {
//   const duration = Date.now() - startDate;
//   const { method, originalUrl, body } = request;
//   const { statusCode, statusMessage } = response;
//   const bodyData = Object.keys(body).length ? JSON.stringify(body) : '';
//   const message = `${method.toUpperCase()} ${originalUrl} ${bodyData} ${statusCode} ${statusMessage} ${duration}ms`;
//   console.log(message);
