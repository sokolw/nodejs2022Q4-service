import { Injectable, LoggerService } from '@nestjs/common';
import { LogLevel } from '../enums/log-level';
import { getLogLevel } from '../utils/get-log-level';
import { toCustomStringWithTimezone } from '../utils/to-custom-string-with-timezone';
import { LogsToFileService } from './logs-to-file.service';

const DEFAULT_LOG_LEVEL = 3;

@Injectable()
export class CustomLoggerService implements LoggerService {
  logLevelsContext: LogLevel[];

  constructor(private logsToFileService: LogsToFileService) {
    this.logLevelsContext = getLogLevel(
      +process.env.LOG_LEVEL ? +process.env.LOG_LEVEL : DEFAULT_LOG_LEVEL,
    );
  }

  log(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled(LogLevel.LOG)) {
      return;
    }
    const wrapped = this.logsWrapper(LogLevel.LOG, message);
    console.log(wrapped);
  }

  error(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled(LogLevel.ERROR)) {
      return;
    }
    const wrapped = this.logsWrapper(LogLevel.ERROR, message);
    console.log(wrapped);
  }

  warn(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled(LogLevel.WARN)) {
      return;
    }
    const wrapped = this.logsWrapper(LogLevel.WARN, message);
    console.log(wrapped);
  }

  debug?(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled(LogLevel.DEBUG)) {
      return;
    }
    const wrapped = this.logsWrapper(LogLevel.DEBUG, message);
    console.log(wrapped);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    if (!this.isLevelEnabled(LogLevel.VERBOSE)) {
      return;
    }
    const wrapped = this.logsWrapper(LogLevel.VERBOSE, message);
    console.log(wrapped);
  }

  logsWrapper(prefix: string, message: string): string {
    return `${toCustomStringWithTimezone(new Date())} [${prefix}]: ${message}`;
  }

  isLevelEnabled(targetLevel: LogLevel): boolean {
    if (this.logLevelsContext.includes(targetLevel)) {
      return true;
    }
  }
}
