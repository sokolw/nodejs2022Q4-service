import { Module } from '@nestjs/common';
import { CustomLoggerService } from './services/custom-logger.service';
import { LogsToFileService } from './services/logs-to-file.service';

@Module({
  providers: [CustomLoggerService, LogsToFileService],
  exports: [CustomLoggerService],
})
export class CoreModule {}
