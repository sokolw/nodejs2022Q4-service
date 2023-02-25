import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from 'src/database/database.module';
import { ArtistController } from './artist.controller';
import { artistProviders } from './artist.providers';
import { ArtistService } from './artist.service';

@Module({
  imports: [CoreModule, DatabaseModule],
  controllers: [ArtistController],
  providers: [...artistProviders, ArtistService],
})
export class ArtistModule {}
