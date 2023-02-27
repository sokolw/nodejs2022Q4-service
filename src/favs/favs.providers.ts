import { DataSource } from 'typeorm';
import { Favorites } from './favs.entity';

export const favsProviders = [
  {
    provide: 'FAVS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Favorites),
    inject: ['DATA_SOURCE'],
  },
];
