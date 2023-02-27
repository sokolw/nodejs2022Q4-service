import { LogLevel } from '../enums/log-level';

export const getLogLevel = (level: number): LogLevel[] => {
  const logLevelList = [
    LogLevel.LOG, //1 lvl
    LogLevel.ERROR, //2 lvl
    LogLevel.WARN, //3 lvl
    LogLevel.DEBUG, //4 lvl
    LogLevel.VERBOSE, //5 lvl
  ];
  return logLevelList.slice(0, level);
};
