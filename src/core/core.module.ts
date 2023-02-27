import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/user/user.providers';
import { CustomLoggerService } from './services/custom-logger.service';
import { LogsToFileService } from './services/logs-to-file.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, CustomLoggerService, LogsToFileService],
  exports: [CustomLoggerService, DatabaseModule, ...userProviders],
})
export class CoreModule {}
