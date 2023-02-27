import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction, Request } from 'express';
import { CustomLoggerService } from '../services/custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private customLoggerService: CustomLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const { method, originalUrl, body, query } = req;
      const { statusCode, statusMessage } = res;
      const timePassed = Date.now() - start;
      const message = `[HTTP] METHOD:${method} URL:${originalUrl} QUERY:${JSON.stringify(
        query,
      )} STATUS_CODE:${statusCode} MESSAGE:${statusMessage} BODY_REQ:${JSON.stringify(
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
