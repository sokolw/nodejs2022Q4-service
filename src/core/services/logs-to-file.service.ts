import { Injectable } from '@nestjs/common';
import { Dirent, writeFileSync, mkdir } from 'fs';
import * as fs from 'fs/promises';
import { EOL } from 'os';
import * as path from 'path';
import { toCustomStringDate } from '../utils/to-custom-string-date';

const BYTE_TO_ONE_KIB = 1024;
const DEFAULT_FILE_MAX_SIZE_KIB = 10;

@Injectable()
export class LogsToFileService {
  async write(data: string): Promise<void> {
    const PATH = this.getBasePath();
    await fs.mkdir(PATH, { recursive: true });
    const files = await fs.readdir(PATH, { withFileTypes: true });

    const configFileSize =
      +process.env.FILE_MAX_SIZE_KIB > 0
        ? +process.env.FILE_MAX_SIZE_KIB
        : DEFAULT_FILE_MAX_SIZE_KIB;

    const fileForWrite = await this.asyncFindFile<Dirent>(
      files,
      async (file) => {
        const stats = await fs.stat(path.join(PATH, file.name));
        const fileSizeInKib = stats.size / BYTE_TO_ONE_KIB;
        return fileSizeInKib < configFileSize;
      },
    );

    if (fileForWrite !== undefined) {
      await this.writeFileWrapper(path.join(PATH, fileForWrite.name), data);
    } else {
      const fileId = files.length + 1;
      await this.writeFileWrapper(
        path.join(PATH, this.getFileName(fileId)),
        data,
      );
    }
  }

  getBasePath() {
    return path.join(
      __dirname,
      '../../../',
      `logs/${toCustomStringDate(new Date())}`,
    );
  }

  getFileName(id: number): string {
    return `${toCustomStringDate(new Date())}-${id}.log`;
  }

  async writeFileWrapper(path: string, data: string): Promise<void> {
    await fs.writeFile(path, `${data}${EOL}`, {
      flag: 'a+',
    });
  }

  async asyncFindFile<T>(
    files: T[],
    asyncCallback: (item: T) => Promise<boolean>,
  ): Promise<T | undefined> {
    const promises = files.map(asyncCallback);
    const results = await Promise.all(promises);
    const index = results.findIndex((result) => result);
    return index >= 0 ? files[index] : undefined;
  }

  static syncWriteErrors(data: string): void {
    const PATH = path.join(__dirname, '../../../', `logs`);
    mkdir(PATH, { recursive: true }, () => console.error);
    writeFileSync(`${PATH}/critical_errors.log`, `${data}${EOL}`, {
      flag: 'a+',
    });
  }
}
