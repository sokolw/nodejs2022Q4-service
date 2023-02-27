import { DataSource } from 'typeorm';
import { Track } from './track.entity';

export const trackProviders = [
  {
    provide: 'TRACK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Track),
    inject: ['DATA_SOURCE'],
  },
];
