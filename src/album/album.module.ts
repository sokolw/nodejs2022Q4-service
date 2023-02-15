import { Module } from '@nestjs/common';
import { artistProviders } from 'src/artist/artist.providers';
import { CoreModule } from 'src/core/core.module';
import { DatabaseModule } from 'src/database/database.module';
import { AlbumController } from './album.controller';
import { albumProviders } from './album.providers';
import { AlbumService } from './album.service';

@Module({
  imports: [CoreModule, DatabaseModule],
  controllers: [AlbumController],
  providers: [...albumProviders, ...artistProviders, AlbumService],
})
export class AlbumModule {}
