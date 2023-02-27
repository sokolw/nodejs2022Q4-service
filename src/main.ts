import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger/dist';
import { CustomLoggerService } from './core/services/custom-logger.service';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { LogsToFileService } from './core/services/logs-to-file.service';
import { toCustomStringWithTimezone } from './core/utils/to-custom-string-with-timezone';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(CustomLoggerService));

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new HttpExceptionFilter(
      httpAdapterHost,
      new CustomLoggerService(new LogsToFileService()),
    ),
  );

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(+process.env.PORT || 4000);
}

process.on('unhandledRejection', (reason, promise) => {
  const logger = new CustomLoggerService(new LogsToFileService());
  logger.error(
    `<UnhandledRejection> PROMISE_REASON: ${reason} | PROMISE: ${JSON.stringify(
      promise,
    )}`,
  );
});

process.on('uncaughtException', (err) => {
  LogsToFileService.syncWriteErrors(
    `${toCustomStringWithTimezone(
      new Date(),
    )} [error]: <UncaughtException> ERROR_MSG:${err.message} ERROR_STACK:${
      err.stack
    }`,
  );
  process.exit(1);
});

bootstrap();
