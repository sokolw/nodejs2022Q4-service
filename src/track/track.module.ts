import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { CoreModule } from 'src/core/core.module';
import { trackProviders } from './track.providers';
import { DatabaseModule } from 'src/database/database.module';
import { albumProviders } from 'src/album/album.providers';
import { artistProviders } from 'src/artist/artist.providers';

@Module({
  imports: [CoreModule, DatabaseModule],
  providers: [
    ...trackProviders,
    ...albumProviders,
    ...artistProviders,
    TrackService,
  ],
  controllers: [TrackController],
})
export class TrackModule {}
