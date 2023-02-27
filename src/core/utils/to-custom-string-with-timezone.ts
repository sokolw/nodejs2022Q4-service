import { pad } from './pad';

export const toCustomStringWithTimezone = (date: Date) => {
  const timezoneOffset = -date.getTimezoneOffset();
  const diff = timezoneOffset >= 0 ? '+' : '-';

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    ' ' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    '.' +
    (date.getMilliseconds() / 1000).toFixed(3).slice(2, 5) +
    `(${diff}` +
    pad(timezoneOffset / 60) +
    ':' +
    pad(timezoneOffset % 60) +
    ')'
  );
};
