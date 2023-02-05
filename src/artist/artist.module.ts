import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [CoreModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
