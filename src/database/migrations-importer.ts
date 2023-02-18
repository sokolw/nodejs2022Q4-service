import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { MigrationInterface } from 'typeorm';

const createListMigrations = async () => {
  const result: MigrationInterface[] = [];
  const files = await readdir(join(__dirname, '../../migrations'), {
    withFileTypes: true,
  });
  for (const file of files) {
    if (file.isFile()) {
      result.push(
        await import(join(__dirname, '/../../migrations', file.name)),
      );
    }
  }
  return result;
};

const migrations = createListMigrations();

//USE ONLY FOR MIGRATIONS
export default migrations;
