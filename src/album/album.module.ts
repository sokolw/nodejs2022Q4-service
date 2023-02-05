import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [CoreModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
