import { Module } from '@nestjs/common';
import { albumProviders } from 'src/album/album.providers';
import { artistProviders } from 'src/artist/artist.providers';
import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from 'src/database/database.module';
import { trackProviders } from 'src/track/track.providers';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  imports: [CoreModule, DatabaseModule],
  controllers: [FavsController],
  providers: [
    ...trackProviders,
    ...albumProviders,
    ...artistProviders,
    FavsService,
  ],
})
export class FavsModule {}
