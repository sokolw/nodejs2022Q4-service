import { Injectable } from '@nestjs/common';

@Injectable()
export class LogsToFileService {
  write(data: string) {
    console.log('WRAPPED LogsToFileService', data);
  }
}
