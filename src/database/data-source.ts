import { Album } from 'src/album/album.entity';
import { Artist } from 'src/artist/artist.entity';
import { Track } from 'src/track/track.entity';
import { User } from 'src/user/user.entity';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { Favorites } from 'src/favs/favs.entity';

const isNestApp =
  process.env.npm_lifecycle_script.includes('nest') ||
  process.env.npm_lifecycle_script.includes('node dist/main');

const migrationsImporterWrapper = async () => {
  const migrations = await (await import('./migrations-importer')).default;
  return migrations.map((item) => Object.values(item)[0]);
};

const dataSource = (async () =>
  new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [User, Artist, Album, Track, Favorites],
    synchronize: false,
    migrationsRun: false,
    migrations: !isNestApp ? await migrationsImporterWrapper() : [],
    migrationsTableName: 'migration-home-library',
  }))();

export default dataSource;
